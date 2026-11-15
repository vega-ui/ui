import { defineWidget, state } from '@vega-ui/core'

export const INPUT = 'input'

export const checkboxShape = state({
  options: { indeterminate: undefined as boolean | undefined },
  owns: {},
})

type CheckboxSnapshot = typeof checkboxShape.__snapshot

export const checkboxWidget = defineWidget({
  state: checkboxShape,

  step: [],

  output: {
    input: {
      ...checkboxShape.part(
        () => [] as const,
        () => ({}),
      ),
      props: {
        select: (state: CheckboxSnapshot) => [state.options.indeterminate],
        render: ([indeterminate]) => (indeterminate === undefined ? {} : { indeterminate }),
      },
    },
  },
})
