import {
  act,
  Action,
  browser,
  collection,
  command,
  controlled,
  defineWidget,
  focus,
  handled,
  idOf,
  Input,
  internal,
  keep,
  key,
  listening,
  lifecycle,
  matching,
  mod,
  nav,
  pointer,
  Result,
  roving,
  state,
  Step,
  timer,
  typeahead,
  TYPEAHEAD,
} from '@vega-ui/core'
import { entries, keysOf, ListboxEntry, ListboxValue, optionInvariants, optionPart, valueOf } from '../listbox'

export const COMBOBOX = 'combobox'
export const LISTBOX = 'listbox'

export const FOCUS_COMBOBOX = command('focusCombobox')

export const selectShape = state({
  options: { items: [] as readonly ListboxEntry[], disabled: false, readOnly: false, typeahead: true },
  owns: { value: controlled(null as ListboxValue | null), active: controlled(null as string | null), open: controlled(false) },
  follows: ['disabled', 'readOnly'],
  internal: { typed: internal(''), moved: internal(false) },
  observes: { shown: matching(LISTBOX, ':popover-open') },
  collection: (options) => entries.of(options.items),
})

type SelectSnapshot = typeof selectShape.__snapshot

const OPENERS = [key.with(nav.forward, mod.alt), nav.forward, nav.backward, key.enter, key.space]

const SHOW = [act.showPopover(LISTBOX)]
const HIDE = [act.hidePopover(LISTBOX)]
const FOCUS = [act.focusPart(COMBOBOX)]

export const isShown = (state: SelectSnapshot) => state.shown

const selectedKey = (state: SelectSnapshot) => (state.value === null ? null : (keysOf(state, state.value)[0] ?? null))

const navigable = (state: SelectSnapshot, key: unknown): key is string => collection.has(state.collection, key as string | null) && collection.isNavigable(state.collection, key as string)

const activate = (state: SelectSnapshot, at: string | null) => selectShape.moved.set(selectShape.active.set(state, at), false)

const startAt = (state: SelectSnapshot) => {
  const selected = selectedKey(state)
  return selected !== null && navigable(state, selected) ? selected : collection.first(state.collection)
}

const opened = (state: SelectSnapshot, at = startAt(state), before: readonly Action<string>[] = []) =>
  handled(activate(selectShape.open.set(state, true), at), at === null ? [...before, ...SHOW] : [...before, ...SHOW, act.reveal(at)])

const closed = (state: SelectSnapshot) => selectShape.active.set(selectShape.open.set(state, false), null)

const pick = (state: SelectSnapshot, key: string) => selectShape.value.set(state, valueOf(state, key) ?? null)

const search = typeahead({ active: selectShape.active, typed: selectShape.typed, strategy: 'activedescendant', enabled: selectShape.options.typeahead })

const onReset = listening<SelectSnapshot>([browser.reset], (state, input) => {
  if (!input.is(browser.reset)) return undefined
  if (state.options.value !== undefined) return keep(state)

  return keep(selectShape.value.set(state, state.options.defaultValue ?? null))
})

const onCommand: Step<SelectSnapshot> = (state, input) => (input.is(FOCUS_COMBOBOX) ? keep(state, FOCUS) : undefined)

const whenEnabled: Step<SelectSnapshot> = (state, input) => {
  if (input.is(timer(TYPEAHEAD))) return undefined

  return state.options.disabled || state.options.readOnly ? keep(state) : undefined
}

const followOpen: Step<SelectSnapshot> = (state, input) => {
  if (!input.is(lifecycle.connect) && !input.is(lifecycle.options)) return undefined

  const open = state.open && !state.options.disabled && !state.options.readOnly
  if (open === state.shown) return keep(state)

  return keep(state, open ? SHOW : HIDE)
}

const onToggle = listening<SelectSnapshot>([browser.toggle], (state, input) => {
  if (!input.is(browser.toggle)) return undefined
  if (!input.to) return keep(closed(state))
  if (state.open && state.active !== null) return keep(state)

  const at = startAt(state)
  return keep(activate(selectShape.open.set(state, true), at), at === null ? [] : [act.reveal(at)])
})

const pressCombobox = listening<SelectSnapshot>([pointer.down, pointer.press], (state, input) => {
  if (input.part !== COMBOBOX) return undefined
  if (input.is(pointer.down)) return state.shown ? handled(closed(state), [...HIDE, ...FOCUS]) : opened(state, startAt(state), FOCUS)
  if (input.is(pointer.press)) return handled(state)

  return undefined
})

const whileClosed = listening<SelectSnapshot>([...OPENERS, nav.first, nav.last, ...(search.listens ?? [])], (state, input) => {
  if (state.shown || input.type === 'timer') return undefined
  if (OPENERS.some((opener) => input.is(opener))) return opened(state)
  if (input.is(nav.first)) return opened(state, collection.first(state.collection))
  if (input.is(nav.last)) return opened(state, collection.last(state.collection))

  const found = search(state, input)
  if (!found || found.state.active === null) return found ?? keep(state)

  return handled(selectShape.moved.set(selectShape.open.set(found.state, true), true), [...SHOW, ...found.actions])
})

const leaving = (state: SelectSnapshot, input: Input<string>) => {
  const forgotten = search(state, input)
  if (!forgotten) return keep(state, HIDE)

  return keep(forgotten.state, [...forgotten.actions, ...HIDE])
}

const whileOpen = listening<SelectSnapshot>([key.with(nav.backward, mod.alt), key.tab, key.with(key.tab, mod.shift), key.enter, key.space, pointer.press, focus.leave], (state, input) => {
  if (input.is(key.with(nav.backward, mod.alt))) return handled(closed(state.active === null ? state : pick(state, state.active)), HIDE)
  if (input.is(key.tab) || input.is(key.with(key.tab, mod.shift))) return keep(closed(state.moved && state.active !== null ? pick(state, state.active) : state), HIDE)
  if (input.is(key.enter) || input.is(key.space)) return handled(closed(state.active === null ? state : pick(state, state.active)), HIDE)
  if (input.is(pointer.press) && navigable(state, input.key)) return handled(closed(pick(state, input.key)), HIDE)
  if (input.is(focus.leave)) return leaving(state, input)

  return undefined
})

const byKeyboard = (step: Step<SelectSnapshot>) => listening<SelectSnapshot>(step.listens ?? [], (state, input) => {
  const result: Result<SelectSnapshot> | undefined = step(state, input)
  if (!result || input.type === 'pointer' || result.state.active === state.active) return result

  return { ...result, state: selectShape.moved.set(result.state, true) }
})

export const selectWidget = defineWidget({
  state: selectShape,

  step: [
    onReset,
    onCommand,
    followOpen,
    onToggle,
    whenEnabled,
    pressCombobox,
    whileClosed,
    whileOpen,
    byKeyboard(roving({ active: selectShape.active, strategy: 'activedescendant', hover: true, page: 10 })),
    byKeyboard(search),
  ],

  output: {
    combobox: selectShape.part(
      (state) => [state.shown, state.options.disabled, state.options.readOnly, idOf(state, LISTBOX), state.active === null ? null : idOf(state, 'option', state.active)] as const,
      ([shown, disabled, readOnly, listboxId, activeId]) => ({
        role: 'combobox',
        disabled,
        'aria-readonly': readOnly,
        'aria-haspopup': 'listbox',
        'aria-expanded': shown,
        'aria-controls': listboxId,
        'aria-activedescendant': shown && activeId !== null ? activeId : undefined,
        'data-open': shown,
        popoverTarget: disabled || readOnly ? undefined : listboxId,
      }),
    ),
    listbox: selectShape.part(
      (state) => [idOf(state, LISTBOX)] as const,
      ([id]) => ({ id, role: 'listbox' }),
    ),
    option: optionPart,
  },

  invariants: optionInvariants(selectShape),
})
