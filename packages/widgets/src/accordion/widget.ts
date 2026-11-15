import { command, controlled, defineWidget, keep, state, Step } from '@vega-ui/core'

export const TOGGLE_ITEM = command('toggleItem')

export const accordionShape = state({
  options: { multiple: false },
  owns: { opened: controlled([] as readonly string[]) },
})

type AccordionSnapshot = typeof accordionShape.__snapshot

const toggling: Step<AccordionSnapshot> = (state, input) => {
  if (!input.is(TOGGLE_ITEM) || input.value === undefined) return undefined

  const { opened } = state
  if (input.to !== true) return keep(accordionShape.opened.set(state, opened.filter((value) => value !== input.value)))
  if (opened.includes(input.value)) return keep(state)

  return keep(accordionShape.opened.set(state, state.options.multiple ? [...opened, input.value] : [input.value]))
}

export const accordionWidget = defineWidget({
  state: accordionShape,
  step: [toggling],
})
