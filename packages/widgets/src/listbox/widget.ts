import {
  act,
  collection,
  controlled,
  defineWidget,
  Field,
  focus,
  handled,
  idOf,
  internal,
  keep,
  key,
  roving,
  selection,
  SelectionMode,
  state,
  Step,
  timer,
  typeahead,
  TYPEAHEAD,
} from '@vega-ui/core'
import { entries, keysOf, ListboxEntry, ListboxSelected, ListboxValue, optionInvariants, optionPart, valueOf, valuesOf } from './items'

export const listboxShape = state({
  options: { items: [] as readonly ListboxEntry[], mode: 'single' as SelectionMode, disabled: false, typeahead: true },
  owns: { value: controlled(null as ListboxSelected), active: controlled(null as string | null) },
  internal: { anchor: internal(null as string | null), typed: internal('') },
  collection: (options) => entries.of(options.items),
})

type ListboxSnapshot = typeof listboxShape.__snapshot

const sameSelected = (previous: ListboxSelected, next: ListboxSelected) => {
  if (previous === next) return true
  if (previous == null || next == null || typeof previous !== 'object' || typeof next !== 'object') return false
  return previous.length === next.length && previous.every((value, position) => value === next[position])
}

const selectedKeys: Field<ListboxSnapshot, readonly string[]> = {
  name: 'value',
  get: (state) => valuesOf(state.value).flatMap((value) => keysOf(state, value)),
  set: (state, keys) => {
    const values = [...new Set(keys.map((key) => valueOf(state, key)).filter((value): value is ListboxValue => value !== undefined))]
    const next = state.options.mode === 'single' ? (values[0] ?? null) : values
    return sameSelected(state.value, next) ? state : listboxShape.value.set(state, next)
  },
}

const whenEnabled: Step<ListboxSnapshot> = (state, input) => {
  if (input.is(timer(TYPEAHEAD))) return undefined

  return state.options.disabled ? keep(state) : undefined
}

const startFromSelected: Step<ListboxSnapshot> = (state, input) => {
  if (!input.is(focus.enter) || state.active != null) return undefined

  const keys = selectedKeys.get(state)
  const selected = state.collection.order.find((key) => keys.includes(key) && collection.isNavigable(state.collection, key))
  if (selected === undefined) return undefined

  return handled(listboxShape.active.set(state, selected), [act.reveal(selected)])
}

export const listboxWidget = defineWidget({
  state: listboxShape,

  step: [
    whenEnabled,
    startFromSelected,
    roving({ active: listboxShape.active, strategy: 'activedescendant', hover: true, page: 10 }),
    selection({
      value: selectedKeys,
      active: listboxShape.active,
      anchor: listboxShape.anchor,
      mode: listboxShape.options.mode,
      strategy: 'activedescendant',
      keys: [key.space, key.enter],
    }),
    typeahead({ active: listboxShape.active, typed: listboxShape.typed, strategy: 'activedescendant', enabled: listboxShape.options.typeahead }),
  ],

  output: {
    root: listboxShape.part(
      (state) => [state.options.mode, state.options.disabled, state.active == null ? null : idOf(state, 'option', state.active)] as const,
      ([mode, disabled, activeId]) => ({
        role: 'listbox',
        tabIndex: disabled ? undefined : 0,
        'aria-disabled': disabled || undefined,
        'aria-multiselectable': mode === 'multiple' || undefined,
        'aria-activedescendant': activeId ?? undefined,
      }),
    ),
    option: optionPart,
  },

  invariants: optionInvariants(listboxShape),
})
