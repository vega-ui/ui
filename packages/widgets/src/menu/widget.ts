import {
  act,
  browser,
  collection,
  command,
  controlled,
  defineWidget,
  Entry,
  focus,
  handled,
  idOf,
  Input,
  internal,
  keep,
  key,
  lifecycle,
  listening,
  matching,
  mod,
  nav,
  pointer,
  roving,
  source,
  state,
  Step,
  typeahead,
} from '@vega-ui/core'

export type MenuItemKind = 'item' | 'checkbox' | 'radio'

export interface MenuItemData {
  readonly kind: MenuItemKind
  readonly disabled: boolean
  readonly label: string
  readonly value?: string
}

export type MenuEntry = Entry<string, MenuItemData>

export const TRIGGER = 'trigger'
export const CONTENT = 'content'

export const CHECK = command('check')

const ROLES: Record<MenuItemKind, string> = { item: 'menuitem', checkbox: 'menuitemcheckbox', radio: 'menuitemradio' }

const entries = source({
  key: (entry: MenuEntry) => entry.key,
  label: (entry) => entry.data.label,
})

export const menuShape = state({
  options: { items: [] as readonly MenuEntry[] },
  owns: { open: controlled(false) },
  internal: { active: internal(null as string | null), typed: internal(''), staying: internal(null as string | null) },
  observes: { shown: matching(CONTENT, ':popover-open') },
  collection: (options) => entries.of(options.items),
  parts: [TRIGGER, CONTENT],
})

type MenuSnapshot = typeof menuShape.__snapshot

const SHOW = [act.showPopover(CONTENT)]
const HIDE = [act.hidePopover(CONTENT)]
const RETURN = [act.focusPart(TRIGGER)]

export const isShown = (state: MenuSnapshot) => state.shown

const dataOf = (state: MenuSnapshot, key: string | undefined) => {
  if (!collection.has(state.collection, key)) return undefined

  return state.options.items[state.collection.index.get(key)!].data
}

const closed = (state: MenuSnapshot) => {
  const hidden = menuShape.open.set(state, false)

  return menuShape.staying.set(menuShape.active.set(hidden, null), null)
}

const opened = (state: MenuSnapshot, at: string | null) => {
  const next = menuShape.active.set(menuShape.open.set(state, true), at)
  if (at === null) return handled(next, SHOW)

  return handled(next, [...SHOW, act.focus(at)])
}

const search = typeahead({ active: menuShape.active, typed: menuShape.typed, strategy: 'focus', enabled: { get: isShown } })

const following: Step<MenuSnapshot> = (state, input) => {
  if (!input.is(lifecycle.connect) && !input.is(lifecycle.options)) return undefined
  if (input.is(lifecycle.options) && !input.changed?.includes('open')) return keep(state)
  if (state.open === state.shown) return keep(state)

  return keep(state, state.open ? SHOW : HIDE)
}

const toggling = listening<MenuSnapshot>([browser.toggle], (state, input) => {
  if (!input.is(browser.toggle) || input.part !== CONTENT) return undefined
  if (!input.to) return keep(closed(state))

  const next = menuShape.open.set(state, true)
  const first = collection.first(state.collection)
  if (state.active !== null || first === null) return keep(next)

  return keep(menuShape.active.set(next, first), [act.focus(first)])
})

const fromTrigger = listening<MenuSnapshot>([nav.forward, nav.backward], (state, input) => {
  if (input.part !== TRIGGER) return undefined
  if (input.is(nav.forward)) return opened(state, collection.first(state.collection))
  if (input.is(nav.backward)) return opened(state, collection.last(state.collection))

  return undefined
})

const entering = listening<MenuSnapshot>([focus.enter, focus.move], (state, input) => {
  if (!input.is(focus.enter) && !input.is(focus.move)) return undefined

  const active = collection.has(state.collection, input.key) ? input.key : null

  return keep(menuShape.staying.set(menuShape.active.set(state, active), null))
})

const forgetting = (state: MenuSnapshot, input: Input<string>) => search(state, input) ?? keep(state)

const leaving = listening<MenuSnapshot>([focus.leave], (state, input) => {
  if (!input.is(focus.leave)) return undefined

  const forgotten = forgetting(state, input)
  if (!state.shown) return forgotten

  return keep(closed(forgotten.state), [...forgotten.actions, ...HIDE])
})

const escaping = listening<MenuSnapshot>([key.escape], (state, input) => {
  if (!input.is(key.escape) || !state.shown) return undefined

  return handled(closed(state), [...HIDE, ...RETURN])
})

const tabbingBack = listening<MenuSnapshot>([key.with(key.tab, mod.shift)], (state, input) => {
  if (!input.is(key.with(key.tab, mod.shift)) || !state.shown || input.part !== CONTENT) return undefined

  return handled(closed(state), [...HIDE, ...RETURN])
})

const spacing = listening<MenuSnapshot>([key.space], (state, input) => {
  const data = dataOf(state, input.key)
  if (!input.is(key.space) || data === undefined || input.key === undefined) return undefined
  if (data.disabled) return handled(state)

  const staying = data.kind === 'item' ? null : input.key

  return handled(menuShape.staying.set(state, staying), [act.click(input.key)])
})

const checking = (key: string, data: MenuItemData) => {
  if (data.kind === 'checkbox') return [act.sendAt(key, CHECK)]
  if (data.kind === 'radio') return [act.sendAt(key, CHECK, { value: data.value })]

  return []
}

const pressing = listening<MenuSnapshot>([pointer.press], (state, input) => {
  const data = dataOf(state, input.key)
  if (!input.is(pointer.press) || data === undefined || input.key === undefined) return undefined

  const next = menuShape.staying.set(state, null)
  if (data.disabled) return handled(next)
  if (state.staying === input.key) return keep(next, checking(input.key, data))

  return keep(closed(next), [...checking(input.key, data), ...HIDE, ...RETURN])
})

const moving = roving<MenuSnapshot, string>({ active: menuShape.active, strategy: 'focus', wrap: true })

const movingInside = listening<MenuSnapshot>(moving.listens ?? [], (state, input) => {
  if (input.part === TRIGGER) return undefined

  return moving(state, input)
})

const hovering = listening<MenuSnapshot>([pointer.hover], (state, input) => {
  const data = dataOf(state, input.key)
  if (!input.is(pointer.hover) || data === undefined || input.key === undefined) return undefined
  if (data.disabled || input.key === state.active) return undefined

  return keep(menuShape.active.set(state, input.key), [act.focus(input.key, true)])
})

export const itemPart = menuShape.part(
  (state, key) => [dataOf(state, key)?.kind ?? 'item', dataOf(state, key)?.disabled ?? false] as const,
  ([kind, disabled]) => ({ role: ROLES[kind], tabIndex: -1, 'aria-disabled': disabled || undefined }),
)

export const menuWidget = defineWidget({
  state: menuShape,

  step: [
    following,
    toggling,
    fromTrigger,
    entering,
    leaving,
    escaping,
    tabbingBack,
    spacing,
    pressing,
    hovering,
    search,
    movingInside,
  ],

  output: {
    trigger: menuShape.part(
      (state) => [idOf(state, TRIGGER), idOf(state, CONTENT), state.shown] as const,
      ([id, contentId, shown]) => ({ id, 'aria-haspopup': 'menu', 'aria-expanded': shown, 'aria-controls': contentId, popoverTarget: contentId, 'data-open': shown }),
    ),
    content: menuShape.part(
      (state) => [idOf(state, CONTENT), idOf(state, TRIGGER)] as const,
      ([id, triggerId]) => ({ id, role: 'menu', tabIndex: -1, 'aria-labelledby': triggerId }),
    ),
    item: itemPart,
  },
})

export const menuCheckboxShape = state({
  options: {},
  owns: { checked: controlled(false) },
})

const toggleChecked = listening<typeof menuCheckboxShape.__snapshot>([CHECK], (state, input) => {
  if (!input.is(CHECK)) return undefined

  return keep(menuCheckboxShape.checked.set(state, !state.checked))
})

export const menuCheckboxWidget = defineWidget({
  state: menuCheckboxShape,

  step: [toggleChecked],

  output: {
    item: menuCheckboxShape.part((state) => [state.checked] as const, ([checked]) => ({ 'aria-checked': checked, 'data-checked': checked })),
  },
})

export interface MenuRadioData {
  readonly disabled: boolean
}

export type MenuRadioEntry = Entry<string, MenuRadioData>

const radios = source({
  key: (entry: MenuRadioEntry) => entry.key,
  disabled: (entry) => entry.data.disabled,
})

export const menuRadioGroupShape = state({
  options: { items: [] as readonly MenuRadioEntry[] },
  owns: { value: controlled(null as string | null) },
  collection: (options) => radios.of(options.items),
})

const checkValue = listening<typeof menuRadioGroupShape.__snapshot>([CHECK], (state, input) => {
  if (!input.is(CHECK) || input.value === undefined || !collection.isNavigable(state.collection, input.value)) return undefined

  return keep(menuRadioGroupShape.value.set(state, input.value))
})

export const menuRadioGroupWidget = defineWidget({
  state: menuRadioGroupShape,

  step: [checkValue],

  output: {
    group: menuRadioGroupShape.part(() => [] as const, () => ({ role: 'group' })),
    radio: menuRadioGroupShape.part(
      (state, value) => [state.value === value] as const,
      ([checked]) => ({ 'aria-checked': checked, 'data-checked': checked }),
    ),
  },
})
