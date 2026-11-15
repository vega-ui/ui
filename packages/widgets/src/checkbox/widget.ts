import { defineWidget, state } from '@vega-ui/core'

export const INPUT = 'input'

export const checkboxShape = state({
  options: { indeterminate: undefined as boolean | undefined },
  owns: {},
  parts: [INPUT],
})

export const checkboxWidget = defineWidget({
  state: checkboxShape,

  step: [],

  output: {
    input: {
      ...checkboxShape.part(
        () => [] as const,
        () => ({}),
      ),
      props: checkboxShape.part(
        (state) => [state.options.indeterminate] as const,
        ([indeterminate]) => (indeterminate === undefined ? {} : { indeterminate }),
      ),
    },
  },
})
