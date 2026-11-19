import { controlled, defineWidget, keep, listening, pointer, state } from '@vega-ui/core'

export const toggleShape = state({
  options: {},
  owns: { pressed: controlled(false) },
})

const pressing = listening<typeof toggleShape.__snapshot>([pointer.press], (state, input) => {
  if (!input.is(pointer.press)) return undefined

  return keep(toggleShape.pressed.set(state, !state.pressed))
})

export const toggleWidget = defineWidget({
  state: toggleShape,

  step: [pressing],

  output: {
    root: toggleShape.part((state) => [state.pressed] as const, ([pressed]) => ({ 'aria-pressed': pressed, 'data-pressed': pressed })),
  },
})
