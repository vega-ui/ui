import { collection, defineWidget, Entry, Field, focus, internal, keep, listening, roving, source, state, Step } from '@vega-ui/core'

export type ToolbarOrientation = 'horizontal' | 'vertical'

export interface ToolbarItemData {
  readonly disabled: boolean
}

export type ToolbarEntry = Entry<string, ToolbarItemData>

const entries = source({
  key: (entry: ToolbarEntry) => entry.key,
  disabled: (entry) => entry.data.disabled,
})

export const toolbarShape = state({
  options: { items: [] as readonly ToolbarEntry[], orientation: 'horizontal' as ToolbarOrientation },
  owns: {},
  internal: { active: internal(null as string | null) },
  collection: (options) => entries.of(options.items),
})

type ToolbarSnapshot = typeof toolbarShape.__snapshot

const tabStopOf = (state: ToolbarSnapshot) => {
  if (state.active !== null && collection.isNavigable(state.collection, state.active)) return state.active

  return collection.first(state.collection)
}

const current: Field<ToolbarSnapshot, string | null> = {
  name: 'active',
  get: tabStopOf,
  set: (state, key) => toolbarShape.active.set(state, key),
}

const entering = listening<ToolbarSnapshot>([focus.enter, focus.move], (state, input) => {
  if (!input.is(focus.enter) && !input.is(focus.move)) return undefined
  if (!collection.has(state.collection, input.key)) return undefined

  return keep(toolbarShape.active.set(state, input.key))
})

const fromItem = (step: Step<ToolbarSnapshot>) => listening<ToolbarSnapshot>(step.listens ?? [], (state, input) => {
  if (!collection.has(state.collection, input.key)) return undefined

  return step(state, input)
})

export const toolbarWidget = defineWidget({
  state: toolbarShape,

  step: [
    entering,
    fromItem(roving({ active: current, strategy: 'focus', wrap: true })),
  ],

  output: {
    root: toolbarShape.part((state) => [state.options.orientation] as const, ([orientation]) => ({ role: 'toolbar', 'aria-orientation': orientation })),
    item: toolbarShape.part((state, key) => [tabStopOf(state) === key] as const, ([stop]) => ({ tabIndex: stop ? 0 : -1 })),
  },
})
