import { collection, controlled, createInput, defineWidget, Entry, Field, focus, Input, internal, keep, listening, nav, payloadOf, pointer, roving, source, state } from '@vega-ui/core'

export interface ToggleGroupItemData {
  readonly disabled: boolean
}

export type ToggleGroupEntry = Entry<string, ToggleGroupItemData>

export type ToggleGroupSelected = string | null | readonly string[]

const entries = source({
  key: (entry: ToggleGroupEntry) => entry.key,
  disabled: (entry) => entry.data.disabled,
})

export const toggleGroupShape = state({
  options: { items: [] as readonly ToggleGroupEntry[], multiple: false, rovingFocus: true },
  owns: { value: controlled(null as ToggleGroupSelected) },
  internal: { active: internal(null as string | null) },
  collection: (options) => entries.of(options.items),
})

type ToggleGroupSnapshot = typeof toggleGroupShape.__snapshot

const pressedValues = (state: ToggleGroupSnapshot): readonly string[] => {
  if (Array.isArray(state.value)) return state.value
  if (typeof state.value === 'string') return [state.value]

  return []
}

export const isPressed = (state: ToggleGroupSnapshot, key: string) => pressedValues(state).includes(key)

const tabStopOf = (state: ToggleGroupSnapshot) => {
  if (state.active !== null && collection.isNavigable(state.collection, state.active)) return state.active

  const pressed = pressedValues(state).find((key) => collection.isNavigable(state.collection, key))
  return pressed ?? collection.first(state.collection)
}

const tabIndexOf = (state: ToggleGroupSnapshot, key: string) => {
  if (state.options.rovingFocus === false) return undefined

  return tabStopOf(state) === key ? 0 : -1
}

const current: Field<ToggleGroupSnapshot, string | null> = {
  name: 'active',
  get: tabStopOf,
  set: (state, key) => toggleGroupShape.active.set(state, key),
}

const toggled = (state: ToggleGroupSnapshot, key: string): ToggleGroupSelected => {
  if (!state.options.multiple) return key

  const values = pressedValues(state)
  return values.includes(key) ? values.filter((value) => value !== key) : [...values, key]
}

const pressing = listening<ToggleGroupSnapshot>([pointer.press], (state, input) => {
  if (!input.is(pointer.press) || input.key === undefined || !collection.isNavigable(state.collection, input.key)) return undefined
  if (!state.options.multiple && state.value === input.key) return keep(state)

  return keep(toggleGroupShape.value.set(state, toggled(state, input.key)))
})

const entering = listening<ToggleGroupSnapshot>([focus.enter, focus.move], (state, input) => {
  if (!input.is(focus.enter) && !input.is(focus.move)) return undefined
  if (state.options.rovingFocus === false) return undefined
  if (input.key === undefined || !collection.has(state.collection, input.key)) return undefined

  return keep(toggleGroupShape.active.set(state, input.key))
})

const leaving = listening<ToggleGroupSnapshot>([focus.leave], (state, input) => {
  if (!input.is(focus.leave)) return undefined

  return keep(toggleGroupShape.active.set(state, null))
})

const alongAxis = (input: Input<string>) => {
  if (input.is(nav.crossForward)) return createInput(nav.forward, payloadOf(input))
  if (input.is(nav.crossBackward)) return createInput(nav.backward, payloadOf(input))

  return input
}

const navigating = roving({ active: current, strategy: 'focus', wrap: true })

const moving = listening<ToggleGroupSnapshot>([...(navigating.listens ?? []), nav.crossForward, nav.crossBackward], (state, input) => {
  if (state.options.rovingFocus === false) return undefined

  return navigating(state, alongAxis(input))
})

export const toggleGroupWidget = defineWidget({
  state: toggleGroupShape,

  step: [
    pressing,
    entering,
    leaving,
    moving,
  ],

  output: {
    root: toggleGroupShape.part((state) => [state.options.multiple] as const, ([multiple]) => ({ role: multiple ? 'group' : 'radiogroup' })),
    item: toggleGroupShape.part(
      (state, key) => [state.options.multiple, isPressed(state, key), tabIndexOf(state, key)] as const,
      ([multiple, pressed, tabIndex]) => {
        if (multiple) return { 'aria-pressed': pressed, 'data-pressed': pressed, tabIndex }

        return { role: 'radio', 'aria-checked': pressed, 'data-pressed': pressed, tabIndex }
      },
    ),
  },
})
