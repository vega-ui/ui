import { controlled, defineWidget, keep, listening, pointer, state } from '@vega-ui/core'

export const TOGGLE = 'toggle'

export const passwordFieldShape = state({
  options: {},
  owns: { shown: controlled(false) },
  parts: [TOGGLE],
})

type PasswordFieldSnapshot = typeof passwordFieldShape.__snapshot

const toggling = listening<PasswordFieldSnapshot>([pointer.press], (state, input) => {
  if (!input.is(pointer.press) || input.part !== TOGGLE) return undefined

  return keep(passwordFieldShape.shown.set(state, !state.shown))
})

export const passwordFieldWidget = defineWidget({
  state: passwordFieldShape,

  step: [toggling],

  output: {
    input: passwordFieldShape.part((state) => [state.shown] as const, ([shown]) => ({ type: shown ? 'text' : 'password' })),
    toggle: passwordFieldShape.part((state) => [state.shown] as const, ([shown]) => ({ 'aria-pressed': shown })),
    shownIcon: passwordFieldShape.part((state) => [state.shown] as const, ([shown]) => ({ 'data-hidden': shown })),
    hiddenIcon: passwordFieldShape.part((state) => [state.shown] as const, ([shown]) => ({ 'data-hidden': !shown })),
  },
})
