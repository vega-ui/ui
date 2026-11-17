import {
  act,
  browser,
  collection,
  controlled,
  defineWidget,
  focus,
  handled,
  idOf,
  internal,
  keep,
  key,
  lifecycle,
  listening,
  matching,
  mod,
  nav,
  Part,
  pointer,
  state,
  Step,
  TextState,
  text,
} from '@vega-ui/core'
import { activeExists, activeIdOf, entries, isSelected, ListboxEntry, ListboxState, ListboxValue, optionPart } from '../listbox'

export const INPUT = 'input'
export const LISTBOX = 'listbox'
export const TRIGGER = 'trigger'

export type ComboboxAutocomplete = 'none' | 'list' | 'both' | 'inline'

export const comboboxShape = state({
  options: { items: [] as readonly ListboxEntry[], disabled: false, readOnly: false, autocomplete: 'list' as ComboboxAutocomplete },
  owns: { value: controlled(null as ListboxValue | null), open: controlled(false) },
  follows: ['disabled', 'readOnly', 'items'],
  internal: { active: internal(null as string | null), typed: internal(null as string | null), inserting: internal(false), waiting: internal(false) },
  observes: { shown: matching(LISTBOX, ':popover-open') },
  collection: (options) => entries.of(options.items),
  parts: [INPUT, LISTBOX, TRIGGER],
})

type ComboboxSnapshot = typeof comboboxShape.__snapshot

const SHOW = [act.showPopover(LISTBOX)]
const HIDE = [act.hidePopover(LISTBOX)]

export const isShown = (state: ComboboxSnapshot) => state.shown

const visible = (state: ComboboxSnapshot) => state.open && state.options.items.length > 0 && !state.options.disabled && !state.options.readOnly

const popover = (state: ComboboxSnapshot) => {
  if (visible(state) === state.shown) return []

  return visible(state) ? SHOW : HIDE
}

const typedOf = (state: ComboboxSnapshot, field: TextState | undefined) => {
  if (state.typed !== null) return state.typed
  if (!field) return null

  const [start, end] = field.selection
  return end === field.value.length ? field.value.slice(0, start) : field.value
}

const written = (state: ComboboxSnapshot, at: string, field: TextState | undefined) => {
  const typed = completes(state) ? typedOf(state, field) : null
  const position = state.collection.index.get(at)
  if (typed === null || position === undefined) return { state, actions: [] }

  const { label } = state.options.items[position].data
  if (!label.toLowerCase().startsWith(typed.toLowerCase())) return { state, actions: [] }

  return { state: comboboxShape.typed.set(state, typed), actions: [act.setText(INPUT, label, [typed.length, label.length])] }
}

const revealPicked = (state: ComboboxSnapshot) => {
  if (state.value === null) return []

  const picked = state.options.items.find((entry) => entry.data.value === state.value)
  return picked ? [act.reveal(picked.key)] : []
}

const opened = (state: ComboboxSnapshot, at: string | null, field?: TextState) => {
  const next = comboboxShape.active.set(comboboxShape.open.set(state, true), at)
  if (at === null) return handled(next, [...popover(next), ...revealPicked(next)])

  const writing = written(next, at, field)
  return handled(writing.state, [...writing.actions, ...popover(writing.state), act.reveal(at)])
}

const settled = (state: ComboboxSnapshot) => comboboxShape.waiting.set(comboboxShape.typed.set(comboboxShape.active.set(state, null), null), false)

const closed = (state: ComboboxSnapshot) => settled(comboboxShape.open.set(state, false))

const completes = (state: ComboboxSnapshot) => state.options.autocomplete === 'both' || state.options.autocomplete === 'inline'

const atEnd = (field: TextState | undefined): field is TextState => {
  if (!field || field.value === '') return false

  const [start, end] = field.selection
  return start === end && end === field.value.length
}

const complete = (state: ComboboxSnapshot, typed: string) => {
  const lowered = typed.toLowerCase()
  const found = state.options.items.find((entry) => collection.isNavigable(state.collection, entry.key) && entry.data.label.length > typed.length && entry.data.label.toLowerCase().startsWith(lowered))
  const next = comboboxShape.typed.set(comboboxShape.active.set(state, found?.key ?? null), typed)

  if (found) {
    const { label } = found.data
    const written = [act.setText(INPUT, label, [typed.length, label.length]), ...popover(next)]
    return keep(next, visible(next) ? [...written, act.reveal(found.key)] : written)
  }
  if (state.active === null) return keep(next, popover(next))

  return keep(next, [act.setText(INPUT, typed), ...popover(next)])
}

const pick = (state: ComboboxSnapshot, at: string) => {
  const position = state.collection.index.get(at)
  if (position === undefined) return handled(state)

  const { value, label } = state.options.items[position].data
  const next = closed(comboboxShape.value.set(state, value))
  return handled(next, [act.setText(INPUT, label, [label.length, label.length]), ...popover(next)])
}

const onReset = listening<ComboboxSnapshot>([browser.reset], (state, input) => {
  if (!input.is(browser.reset)) return undefined
  if (state.options.value !== undefined) return keep(state)

  return keep(comboboxShape.value.set(state, state.options.defaultValue ?? null))
})

const FOLLOWED = ['open', 'disabled', 'readOnly', 'items']

const following: Step<ComboboxSnapshot> = (state, input) => {
  if (!input.is(lifecycle.connect) && !input.is(lifecycle.options)) return undefined
  if (input.is(lifecycle.options) && !input.changed?.some((name) => FOLLOWED.includes(name))) return keep(state)
  if (input.is(lifecycle.options) && state.waiting && state.typed !== null && input.changed?.includes('items')) return complete(comboboxShape.waiting.set(state, false), state.typed)

  return keep(state, popover(state))
}

const toggled = listening<ComboboxSnapshot>([browser.toggle], (state, input) => (input.is(browser.toggle) ? keep(state) : undefined))

const whenEnabled: Step<ComboboxSnapshot> = (state) => (state.options.disabled || state.options.readOnly ? keep(state) : undefined)

const noting = listening<ComboboxSnapshot>([text.edit], (state, input) => {
  if (!input.is(text.edit) || input.part !== INPUT) return undefined

  return keep(comboboxShape.inserting.set(state, input.edit?.type === 'insertText'))
})

const typing = listening<ComboboxSnapshot>([text.change], (state, input) => {
  if (!input.is(text.change) || input.part !== INPUT) return undefined

  const open = state.options.autocomplete === 'inline' ? state.open : true
  const next = comboboxShape.inserting.set(settled(comboboxShape.open.set(comboboxShape.value.set(state, null), open)), false)
  if (!completes(state) || !state.inserting || !atEnd(input.field)) return keep(next, popover(next))

  return complete(comboboxShape.waiting.set(next, true), input.field.value)
})

const editing = listening<ComboboxSnapshot>([text.key, pointer.down], (state, input) => {
  if (!(input.is(text.key) || input.is(pointer.down)) || input.part !== INPUT || state.active === null) return undefined

  return keep(settled(state))
})

const pressing = listening<ComboboxSnapshot>([pointer.press], (state, input) => {
  if (!input.is(pointer.press) || input.part !== TRIGGER) return undefined
  if (state.shown) return handled(closed(state), [act.focusPart(INPUT), ...HIDE])

  const next = settled(comboboxShape.open.set(state, true))
  return handled(next, [act.focusPart(INPUT), ...popover(next), ...revealPicked(next)])
})

const leaving = listening<ComboboxSnapshot>([focus.leave], (state, input) => {
  if (!input.is(focus.leave) || !state.open) return undefined
  if (state.typed !== null && state.active !== null) return pick(state, state.active)

  const next = closed(state)
  return keep(next, popover(next))
})

const whileHidden = listening<ComboboxSnapshot>([key.with(nav.forward, mod.alt), nav.forward, nav.backward, key.enter, key.escape], (state, input) => {
  if (state.shown) return undefined
  if (state.typed !== null && state.active !== null) {
    if (input.is(key.enter)) return pick(state, state.active)
    if (input.is(key.escape)) return handled(settled(state), [act.setText(INPUT, state.typed)])
  }
  if (input.is(key.enter)) return undefined
  if (input.is(key.escape)) {
    if (state.value === null && !input.field?.value) return state.open ? keep(closed(state)) : undefined

    return handled(closed(comboboxShape.value.set(state, null)), [act.setText(INPUT, '')])
  }
  if (state.options.items.length === 0) return undefined
  if (input.is(key.with(nav.forward, mod.alt))) return opened(state, null)
  if (input.is(nav.forward)) return opened(state, collection.first(state.collection), input.field)
  if (input.is(nav.backward)) return opened(state, collection.last(state.collection), input.field)

  return undefined
})

const move = (state: ComboboxSnapshot, at: string | null, field: TextState | undefined) => {
  if (at === null) return handled(state)

  const writing = written(comboboxShape.waiting.set(comboboxShape.active.set(state, at), false), at, field)
  return handled(writing.state, [...writing.actions, act.reveal(at)])
}

const whileShown = listening<ComboboxSnapshot>([key.with(nav.backward, mod.alt), key.with(nav.forward, mod.alt), nav.forward, nav.backward, key.enter, key.escape, pointer.press], (state, input) => {
  if (!state.shown) return undefined
  if (input.is(key.with(nav.backward, mod.alt))) return state.active === null ? handled(closed(state), HIDE) : pick(state, state.active)
  if (input.is(key.with(nav.forward, mod.alt))) return handled(state)
  if (input.is(nav.forward)) return move(state, collection.next(state.collection, state.active), input.field)
  if (input.is(nav.backward)) return move(state, collection.previous(state.collection, state.active), input.field)
  if (input.is(key.enter)) return state.active === null ? undefined : pick(state, state.active)
  if (input.is(key.escape)) return handled(closed(state), state.typed === null ? HIDE : [act.setText(INPUT, state.typed), ...HIDE])

  if (!input.is(pointer.press)) return undefined

  const navigable = collection.has(state.collection, input.key) && collection.isNavigable(state.collection, input.key)
  return navigable ? pick(state, input.key) : undefined
})

export const comboboxOptionPart: Part<ListboxState, string> = {
  select: (state, key) => [idOf(state, 'option', key), state.active === key, state.active === null ? isSelected(state, key) : state.active === key, state.collection.disabled.has(key)],
  render: optionPart.render,
}

export const comboboxWidget = defineWidget({
  state: comboboxShape,

  step: [onReset, following, toggled, leaving, whenEnabled, noting, typing, editing, pressing, whileHidden, whileShown],

  output: {
    input: comboboxShape.part(
      (state) => [state.shown, state.options.disabled, state.options.readOnly, state.options.autocomplete, idOf(state, LISTBOX), activeIdOf(state)] as const,
      ([shown, disabled, readOnly, autocomplete, listboxId, activeId]) => ({
        role: 'combobox',
        disabled,
        readOnly,
        autoComplete: 'off',
        'aria-autocomplete': autocomplete,
        'aria-expanded': shown,
        'aria-controls': listboxId,
        'aria-activedescendant': shown && activeId !== null ? activeId : undefined,
        'data-open': shown,
      }),
    ),
    listbox: comboboxShape.part(
      (state) => [idOf(state, LISTBOX)] as const,
      ([id]) => ({ id, role: 'listbox', tabIndex: -1 }),
    ),
    trigger: comboboxShape.part(
      (state) => [state.shown, state.options.disabled || state.options.readOnly, idOf(state, LISTBOX)] as const,
      ([shown, disabled, listboxId]) => ({
        tabIndex: -1,
        disabled,
        'aria-controls': listboxId,
        'aria-expanded': shown,
      }),
    ),
    icon: comboboxShape.part(
      (state) => [state.shown] as const,
      ([shown]) => ({ 'data-open': shown }),
    ),
    option: comboboxOptionPart,
  },

  invariants: { activeExists: activeExists(comboboxShape.active) },
})
