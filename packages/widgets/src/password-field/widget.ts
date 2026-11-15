import { command, controlled, defineWidget, keep, state, Step } from '@vega-ui/core'

export const TOGGLE_SHOWN = command('toggleShown')

export const passwordFieldShape = state({
  options: {},
  owns: { shown: controlled(false) },
})

type PasswordFieldSnapshot = typeof passwordFieldShape.__snapshot

const toggling: Step<PasswordFieldSnapshot> = (state, input) => {
  if (!input.is(TOGGLE_SHOWN)) return undefined

  return keep(passwordFieldShape.shown.set(state, !state.shown))
}

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
