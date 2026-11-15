import { collection, source } from '../../collection'
import { controlled, idOf, internal, state } from '../../state'
import { defineWidget } from '../../widget'
import { roving, selection, SelectionMode, typeahead, TYPEAHEAD } from '../../fragments'

export interface Fruit {
  readonly id: string
  readonly label: string
  readonly disabled?: boolean
}

export const fruits: readonly Fruit[] = [
  { id: 'apple', label: 'Apple' },
  { id: 'banana', label: 'Banana' },
  { id: 'cherry', label: 'Cherry', disabled: true },
  { id: 'date', label: 'Date' },
  { id: 'fig', label: 'Fig' },
]

const items = source({ key: (fruit: Fruit) => fruit.id, disabled: (fruit) => fruit.disabled ?? false, label: (fruit) => fruit.label })

export const shape = state({
  options: { items: fruits, mode: 'single' as SelectionMode },
  owns: {
    value: controlled([] as readonly string[]),
    active: controlled(null as string | null),
  },
  internal: {
    anchor: internal(null as string | null),
    typed: internal(''),
  },
  collection: (options) => items.of(options.items),
})

export const listbox = defineWidget({
  state: shape,

  step: [
    roving({ active: shape.active, strategy: 'activedescendant', page: 2 }),
    selection({ value: shape.value, active: shape.active, anchor: shape.anchor, mode: shape.options.mode, strategy: 'activedescendant' }),
    typeahead({ active: shape.active, typed: shape.typed, strategy: 'activedescendant' }),
  ],

  output: {
    root: shape.part(
      (state) => [state.options.mode, state.active == null ? null : idOf(state, 'option', state.active)] as const,
      ([mode, activeId]) => ({ role: 'listbox', tabIndex: 0, 'aria-multiselectable': mode === 'multiple' || undefined, 'aria-activedescendant': activeId ?? undefined }),
    ),
    option: shape.part(
      (state, key) => [idOf(state, 'option', key), state.active === key, state.value.includes(key), state.collection.disabled.has(key)] as const,
      ([id, active, selected, disabled]) => ({ role: 'option', id, 'aria-selected': selected, 'aria-disabled': disabled || undefined, 'data-active': active || undefined }),
    ),
  },

  invariants: {
    activeExists: {
      check: (state) => state.active == null || collection.isNavigable(state.collection, state.active),
      repair: (state) => shape.active.set(state, collection.first(state.collection)),
    },
    valueSelectable: {
      check: (state) => state.value.every((key) => collection.isNavigable(state.collection, key)),
      repair: (state) => shape.value.set(state, state.value.filter((key) => collection.isNavigable(state.collection, key))),
    },
    typedExpires: {
      check: (state) => state.typed === '' || state.timers.has(TYPEAHEAD),
      repair: (state) => shape.typed.set(state, ''),
    },
  },
})
