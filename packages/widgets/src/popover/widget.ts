import { act, browser, command, controlled, defineWidget, internal, keep, lifecycle, listening, matching, state, Step } from '@vega-ui/core'

export const CONTENT = 'content'

export const CLOSE_POPOVER = command('closePopover')

export const popoverShape = state({
  options: { role: undefined as 'listbox' | 'dialog' | undefined },
  owns: { open: controlled(false) },
  internal: { closing: internal(false) },
  observes: { shown: matching(CONTENT, ':popover-open') },
})

type PopoverSnapshot = typeof popoverShape.__snapshot

const SHOW = [act.showPopover(CONTENT)]
const HIDE = [act.hidePopover(CONTENT)]
const SETTLING = [act.awaitAnimations(CONTENT)]

export const isRendered = (state: PopoverSnapshot) => state.shown || state.closing

const following: Step<PopoverSnapshot> = (state, input) => {
  if (!input.is(lifecycle.connect) && !input.is(lifecycle.options)) return undefined
  if (state.open === state.shown) return keep(state)

  return keep(state, state.open ? SHOW : HIDE)
}

const closing: Step<PopoverSnapshot> = (state, input) => {
  if (!input.is(CLOSE_POPOVER)) return undefined

  return keep(popoverShape.open.set(state, false), popoverShape.open.controlled(state) ? [] : HIDE)
}

const toggling = listening<PopoverSnapshot>([browser.toggle], (state, input) => {
  if (!input.is(browser.toggle) || input.part !== CONTENT) return undefined

  const next = popoverShape.open.set(state, input.to === true)
  if (input.to === true) return keep(popoverShape.closing.set(next, false))

  return keep(popoverShape.closing.set(next, true), SETTLING)
})

const settling: Step<PopoverSnapshot> = (state, input) => {
  if (!input.is(browser.animationEnd) || input.part !== CONTENT) return undefined

  return keep(popoverShape.closing.set(state, false))
}

export const popoverWidget = defineWidget({
  state: popoverShape,

  step: [following, closing, toggling, settling],

  output: {
    content: popoverShape.part(
      (state) => [state.shown, state.options.role] as const,
      ([shown, role]) => ({ popover: 'auto', role, 'data-status': shown ? 'open' : 'close' }),
    ),
  },
})
