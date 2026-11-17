import { AnyShape, Browser, collection, Collection, Entry, Field, Identified, idOf, Invariant, Part, source, TYPEAHEAD } from '@vega-ui/core'

export type ListboxValue = string | number
export type ListboxSelected = ListboxValue | null | readonly ListboxValue[]

export interface ListboxItemData {
  readonly value: ListboxValue
  readonly disabled?: boolean
  readonly label: string
}

export type ListboxEntry = Entry<string, ListboxItemData>

export interface ListboxState extends Browser, Identified {
  readonly options: { readonly items: readonly ListboxEntry[] }
  readonly collection: Collection<string>
  readonly timers: ReadonlyMap<string, number>
  readonly value: ListboxSelected
  readonly active: string | null
}

export interface ListboxShape extends AnyShape {
  readonly __snapshot: ListboxState
  readonly __key: string
}

export interface OptionFields<State> {
  readonly active: Field<State, string | null>
  readonly typed: Field<State, string>
}

export const entries = source({
  key: (entry: ListboxEntry) => entry.key,
  disabled: (entry) => entry.data.disabled ?? false,
  label: (entry) => entry.data.label,
})

const NO_KEYS: readonly string[] = []

const keysByValue = new WeakMap<readonly ListboxEntry[], Map<ListboxValue, string[]>>()

const indexOf = (items: readonly ListboxEntry[]) => {
  const cached = keysByValue.get(items)
  if (cached) return cached

  const index = new Map<ListboxValue, string[]>()
  for (const entry of items) {
    const keys = index.get(entry.data.value)
    if (keys) keys.push(entry.key)
    else index.set(entry.data.value, [entry.key])
  }

  keysByValue.set(items, index)
  return index
}

export const keysOf = (state: ListboxState, value: ListboxValue): readonly string[] => indexOf(state.options.items).get(value) ?? NO_KEYS

export const valuesOf = (selected: ListboxSelected): readonly ListboxValue[] => {
  if (selected == null) return []
  return typeof selected === 'object' ? selected : [selected]
}

export const valueOf = (state: ListboxState, key: string) => {
  const position = state.collection.index.get(key)
  return position === undefined ? undefined : state.options.items[position].data.value
}

export const isSelected = (state: ListboxState, key: string) => {
  const value = valueOf(state, key)
  return value !== undefined && valuesOf(state.value).includes(value)
}

export const activeIdOf = (state: ListboxState) => (state.active !== null && collection.has(state.collection, state.active) ? idOf(state, 'option', state.active) : null)

export const optionPart: Part<ListboxState, string> = {
  select: (state, key) => [idOf(state, 'option', key), state.active === key, isSelected(state, key), state.collection.disabled.has(key)],
  render: ([id, active, selected, disabled]) => ({
    role: 'option',
    id,
    'aria-selected': selected,
    'aria-disabled': disabled || undefined,
    'data-active': active || undefined,
  }),
}

export const activeExists = <State extends ListboxState>(active: Field<State, string | null>): Invariant<State> => ({
  check: (state) => state.active === null || collection.isNavigable(state.collection, state.active),
  repair: (state, before) => {
    const position = state.active === null ? undefined : before.collection.index.get(state.active)
    if (position === undefined) return active.set(state, null)

    return active.set(state, collection.nearest(state.collection, position))
  },
})

export const optionInvariants = <State extends ListboxState & { readonly typed: string }>(fields: OptionFields<State>): Readonly<Record<string, Invariant<State>>> => ({
  activeExists: activeExists(fields.active),
  typedExpires: {
    check: (state) => state.typed === '' || state.timers.has(TYPEAHEAD),
    repair: (state) => fields.typed.set(state, ''),
  },
})
