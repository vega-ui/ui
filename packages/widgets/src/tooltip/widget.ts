import { act, browser, command, controlled, defineWidget, focus, handled, internal, keep, key, lifecycle, listening, matching, pointer, reading, state, Step, timer } from '@vega-ui/core'

export const TRIGGER = 'trigger'
export const CONTENT = 'content'

const SHOW = 'show'
const HIDE = 'hide'

export const REPLACE_TOOLTIP = command('replaceTooltip')

export interface TooltipGroup {
  hold(hide?: () => void): () => void
  isWarm(): boolean
}

export const tooltipShape = state({
  options: { delayOpen: 500 as number, delayClose: 250 as number, group: undefined as TooltipGroup | undefined },
  owns: { open: controlled(false) },
  internal: { closing: internal(false) },
  observes: {
    shown: matching(CONTENT, ':popover-open'),
    focusVisible: matching(TRIGGER, ':focus-visible'),
    warm: reading((options: { group?: TooltipGroup }) => options.group?.isWarm() ?? false, false),
  },
})

type TooltipSnapshot = typeof tooltipShape.__snapshot

const STOP_TIMERS = [act.cancelTimer(SHOW), act.cancelTimer(HIDE)]
const SHOWING = [act.showPopover(CONTENT), act.watchKeys()]
const SETTLING = [act.unwatchKeys(), act.awaitAnimations(CONTENT)]

export const isRendered = (state: TooltipSnapshot) => state.open || state.closing

const show = (state: TooltipSnapshot) => {
  if (state.open) return keep(state, STOP_TIMERS)

  const next = tooltipShape.closing.set(tooltipShape.open.set(state, true), false)
  if (tooltipShape.open.controlled(state)) return keep(next, STOP_TIMERS)

  return keep(next, [...STOP_TIMERS, ...SHOWING])
}

const hide = (state: TooltipSnapshot) => {
  if (!state.open) return keep(state, STOP_TIMERS)

  const next = tooltipShape.open.set(state, false)
  if (tooltipShape.open.controlled(state)) return keep(next, STOP_TIMERS)

  return keep(tooltipShape.closing.set(next, true), [...STOP_TIMERS, ...SETTLING])
}

const isOwnPart = (part: unknown) => part === TRIGGER || part === CONTENT

const following: Step<TooltipSnapshot> = (state, input) => {
  if (!input.is(lifecycle.connect) && !input.is(lifecycle.options)) return undefined
  if (state.open && !state.shown) return keep(tooltipShape.closing.set(state, false), SHOWING)
  if (state.open) return input.is(lifecycle.connect) ? keep(state, [act.watchKeys()]) : keep(state)
  if (!state.shown || state.closing) return keep(state)

  return keep(tooltipShape.closing.set(state, true), SETTLING)
}

const entering = listening<TooltipSnapshot>([pointer.enter], (state, input) => {
  if (!input.is(pointer.enter)) return undefined
  if (input.part === CONTENT) return keep(state, [act.cancelTimer(HIDE)])
  if (input.part !== TRIGGER || input.pointerType === 'touch') return undefined

  const delay = state.warm ? 0 : state.options.delayOpen
  if (state.open || delay <= 0) return show(state)

  return keep(state, [act.cancelTimer(HIDE), act.timer(SHOW, delay)])
})

const leaving = listening<TooltipSnapshot>([pointer.leave], (state, input) => {
  if (!input.is(pointer.leave) || !isOwnPart(input.part)) return undefined
  if (isOwnPart(input.to)) return keep(state)
  if (state.options.delayClose <= 0) return hide(state)

  return keep(state, [act.cancelTimer(SHOW), act.timer(HIDE, state.options.delayClose)])
})

const waiting: Step<TooltipSnapshot> = (state, input) => {
  if (input.is(timer(SHOW))) return show(state)
  if (input.is(timer(HIDE))) return hide(state)

  return undefined
}

const focusing: Step<TooltipSnapshot> = (state, input) => {
  if (input.is(focus.enter)) return state.focusVisible ? show(state) : undefined
  if (input.is(focus.leave)) return hide(state)

  return undefined
}

const pressing = listening<TooltipSnapshot>([pointer.down], (state, input) => {
  if (!input.is(pointer.down) || input.part !== TRIGGER) return undefined

  return hide(state)
})

const dismissing = listening<TooltipSnapshot>([key.escape], (state, input) => {
  if (!input.is(key.escape) || !state.open) return undefined

  const result = hide(state)
  return handled(result.state, result.actions)
})

const replacing: Step<TooltipSnapshot> = (state, input) => {
  if (!input.is(REPLACE_TOOLTIP)) return undefined
  if (state.open && tooltipShape.open.controlled(state)) return keep(tooltipShape.open.set(state, false), STOP_TIMERS)

  const next = tooltipShape.closing.set(tooltipShape.open.set(state, false), false)
  return keep(next, [...STOP_TIMERS, act.unwatchKeys()])
}

const settling: Step<TooltipSnapshot> = (state, input) => {
  if (!input.is(browser.animationEnd) || input.part !== CONTENT) return undefined

  return keep(tooltipShape.closing.set(state, false))
}

export const tooltipWidget = defineWidget({
  state: tooltipShape,

  step: [following, entering, leaving, waiting, focusing, pressing, dismissing, replacing, settling],

  output: {
    content: {
      ...tooltipShape.part(
        () => [] as const,
        () => ({ role: 'tooltip', popover: 'manual' }),
      ),
      live: tooltipShape.part(
        (state) => [state.open] as const,
        ([open]) => ({ 'data-status': open ? 'open' : 'close' }),
      ),
    },
  },
})
