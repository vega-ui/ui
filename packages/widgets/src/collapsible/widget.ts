import { act, browser, controlled, defineWidget, idOf, internal, keep, lifecycle, listening, pointer, Result, runSteps, state, Step } from '@vega-ui/core'

export const TRIGGER = 'trigger'
export const CONTENT = 'content'

const CHANGE_HIDDEN = 'changeHidden'

export const collapsibleShape = state({
  options: {
    contentId: undefined as string | undefined,
    onChangeHidden: undefined as ((hidden: boolean) => void) | undefined,
  },
  owns: { open: controlled(false) },
  internal: { expanded: internal(null as boolean | null), closing: internal(false), reported: internal(undefined as boolean | undefined) },
})

type CollapsibleSnapshot = typeof collapsibleShape.__snapshot

const EXPANDING = [act.animateHeight(CONTENT, true)]
const COLLAPSING = [act.animateHeight(CONTENT, false), act.awaitAnimations(CONTENT)]

const isExpanded = (state: CollapsibleSnapshot) => state.expanded ?? state.open

export const isHidden = (state: CollapsibleSnapshot) => !isExpanded(state) && !state.closing

const contentIdOf = (state: CollapsibleSnapshot) => state.options.contentId ?? idOf(state, CONTENT)

const animated = (state: CollapsibleSnapshot) => {
  if (state.open === isExpanded(state)) return keep(collapsibleShape.expanded.set(state, state.open))

  const next = collapsibleShape.closing.set(collapsibleShape.expanded.set(state, state.open), !state.open)
  return keep(next, state.open ? EXPANDING : COLLAPSING)
}

const pressing = listening<CollapsibleSnapshot>([pointer.press], (state, input) => {
  if (!input.is(pointer.press) || input.part !== TRIGGER) return undefined

  const next = collapsibleShape.open.set(state, !state.open)
  if (collapsibleShape.open.controlled(state)) return keep(next)

  return animated(next)
})

const following: Step<CollapsibleSnapshot> = (state, input) => {
  if (!input.is(lifecycle.connect) && !input.is(lifecycle.options)) return undefined

  return animated(state)
}

const settling: Step<CollapsibleSnapshot> = (state, input) => {
  if (!input.is(browser.animationEnd) || input.part !== CONTENT) return undefined

  return keep(collapsibleShape.closing.set(state, false))
}

const steps = [pressing, following, settling]

const reported = (result: Result<CollapsibleSnapshot>) => {
  const hidden = isHidden(result.state)
  if (hidden === result.state.reported) return result

  return { ...result, state: collapsibleShape.reported.set(result.state, hidden), actions: [...result.actions, act.emit(CHANGE_HIDDEN, hidden)] }
}

const reporting = listening<CollapsibleSnapshot>(steps.flatMap((step) => step.listens ?? []), (state, input) => {
  const result = runSteps(steps, state, input)
  if (!result) return undefined

  return reported(result)
})

export const collapsibleWidget = defineWidget({
  state: collapsibleShape,

  step: [reporting],

  output: {
    trigger: collapsibleShape.part(
      (state) => [state.open, contentIdOf(state)] as const,
      ([open, contentId]) => ({ 'aria-expanded': open, 'aria-controls': contentId, 'data-open': open }),
    ),
    content: {
      ...collapsibleShape.part(
        (state) => [isHidden(state), isExpanded(state), contentIdOf(state)] as const,
        ([hidden, expanded, contentId]) => ({ id: contentId, hidden, 'data-open': expanded }),
      ),
      live: {
        select: (state: CollapsibleSnapshot) => [isHidden(state), isExpanded(state)],
        render: ([hidden, expanded]) => ({ hidden: hidden === true, 'data-open': expanded ? 'true' : 'false' }),
      },
    },
  },
})
