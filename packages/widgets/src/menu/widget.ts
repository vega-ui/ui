import {
  act,
  Action,
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
  measure,
  mod,
  nav,
  Point,
  pointer,
  roving,
  source,
  state,
  Step,
  timer,
  typeahead,
} from '@vega-ui/core'
import { Aim, aims } from './aim'

export type MenuItemKind = 'item' | 'checkbox' | 'radio' | 'submenu'

export interface MenuItemData {
  readonly kind: MenuItemKind
  readonly disabled: boolean
  readonly label: string
  readonly value?: string
  readonly keepOpen?: boolean
}

export type MenuEntry = Entry<string, MenuItemData>

export const TRIGGER = 'trigger'
export const CONTENT = 'content'
export const ANCHOR = 'anchor'

export const CHECK = command('check')
export const DISMISS = command('dismiss')
export const AIM = command('aim')

export const OPENING = 'opening'
const OPEN_DELAY = 100
export const AIMING = 'aiming'
const AIM_GRACE = 300
export const HOLDING = 'holding'
const HOLD_DELAY = 700
const HOLD_SLOP = 10

const ROLES: Record<MenuItemKind, string> = { item: 'menuitem', checkbox: 'menuitemcheckbox', radio: 'menuitemradio', submenu: 'menuitem' }

const entries = source({
  key: (entry: MenuEntry) => entry.key,
  label: (entry) => entry.data.label,
})

export const menuShape = state({
  options: { items: [] as readonly MenuEntry[] },
  owns: { open: controlled(false) },
  internal: {
    active: internal(null as string | null),
    typed: internal(''),
    staying: internal(null as string | null),
    aim: internal(null as Aim | null),
    leftAt: internal(null as Point | null),
    point: internal(null as Point | null),
  },
  observes: {
    shown: matching(CONTENT, ':popover-open'),
    disabled: matching(TRIGGER, '[aria-disabled="true"]'),
    triggerFocused: matching(TRIGGER, ':focus'),
    triggerHovered: matching(TRIGGER, ':hover'),
  },
  collection: (options) => entries.of(options.items),
  parts: [TRIGGER, CONTENT, ANCHOR],
})

type MenuSnapshot = typeof menuShape.__snapshot
type MenuAction = Action<string, typeof TRIGGER | typeof CONTENT | typeof ANCHOR>

const SHOW = [act.showPopover(CONTENT)]
const HIDE = [act.hidePopover(CONTENT)]
const RETURN = [act.focusPart(TRIGGER)]
const CLOSE_ALL: readonly MenuAction[] = [...HIDE, ...RETURN]
const CLOSE_UP: readonly MenuAction[] = [...HIDE, act.sendUp(TRIGGER, DISMISS)]

export const isShown = (state: MenuSnapshot) => state.shown

const dataOf = (state: MenuSnapshot, key: string | undefined) => {
  if (!collection.has(state.collection, key)) return undefined

  return state.options.items[state.collection.index.get(key)!].data
}

const closed = (state: MenuSnapshot) => {
  const hidden = menuShape.open.set(state, false)
  const idle = menuShape.staying.set(menuShape.active.set(hidden, null), null)

  return menuShape.leftAt.set(menuShape.aim.set(idle, null), null)
}

const opened = (state: MenuSnapshot, at: string | null) => {
  const next = menuShape.active.set(menuShape.open.set(state, true), at)
  if (at === null) return handled(next, SHOW)

  return handled(next, [...SHOW, act.focus(at)])
}

const search = typeahead({ active: menuShape.active, typed: menuShape.typed, strategy: 'focus', enabled: { get: isShown } })

const moving = roving<MenuSnapshot, string>({ active: menuShape.active, strategy: 'focus', wrap: true })

const inside = (step: Step<MenuSnapshot>) => listening<MenuSnapshot>(step.listens ?? [], (state, input) => {
  if (input.part === TRIGGER || input.is(focus.enter)) return undefined

  return step(state, input)
})

const following: Step<MenuSnapshot> = (state, input) => {
  if (!input.is(lifecycle.connect) && !input.is(lifecycle.options)) return undefined
  if (input.is(lifecycle.options) && !input.changed?.includes('open')) return keep(state)
  if (state.open === state.shown) return keep(state)

  return keep(state, state.open ? SHOW : HIDE)
}

const toggling = (focusesFirst: boolean) => listening<MenuSnapshot>([browser.toggle], (state, input) => {
  if (!input.is(browser.toggle) || input.part !== CONTENT) return undefined
  if (!input.to) return keep(closed(state))

  const next = menuShape.open.set(state, true)
  const first = collection.first(state.collection)
  if (!focusesFirst || state.active !== null || first === null) return keep(next)

  return keep(menuShape.active.set(next, first), [act.focus(first)])
})

const fromTrigger = listening<MenuSnapshot>([nav.forward, nav.backward], (state, input) => {
  if (input.part !== TRIGGER) return undefined
  if (input.is(nav.forward)) return opened(state, collection.first(state.collection))
  if (input.is(nav.backward)) return opened(state, collection.last(state.collection))

  return undefined
})

const fromParent = listening<MenuSnapshot>([key.enter, key.space, nav.crossForward, pointer.press], (state, input) => {
  const opens = input.is(key.enter) || input.is(key.space) || input.is(nav.crossForward)
  if (input.part !== TRIGGER || (!opens && !input.is(pointer.press))) return undefined
  if (state.disabled) return handled(state)
  if (input.is(pointer.press)) return keep(menuShape.open.set(state, true), [act.cancelTimer(OPENING), ...SHOW])

  return opened(state, collection.first(state.collection))
})

const resting = listening<MenuSnapshot>([pointer.enter, timer(OPENING)], (state, input) => {
  if (input.is(timer(OPENING))) {
    if (state.disabled) return keep(state)
    if (state.triggerFocused) return keep(menuShape.open.set(state, true), SHOW)
    if (state.triggerHovered) return keep(state, [act.timer(OPENING, OPEN_DELAY)])

    return keep(state)
  }
  if (!input.is(pointer.enter) || input.part !== TRIGGER || input.pointerType === 'touch') return undefined
  if (state.disabled || state.shown) return keep(state)

  return keep(state, [act.timer(OPENING, OPEN_DELAY)])
})

const departing = listening<MenuSnapshot>([pointer.leave], (state, input) => {
  if (!input.is(pointer.leave) || input.part !== TRIGGER || input.pointerType === 'touch') return undefined
  if (!state.shown) return keep(state, [act.cancelTimer(OPENING)])
  if (input.to === CONTENT || input.point === undefined) return keep(state)

  return keep(menuShape.leftAt.set(state, input.point), [act.measure({ name: AIMING, parts: [CONTENT], rect: true })])
})

const measured = listening<MenuSnapshot>([measure.done], (state, input) => {
  if (!input.is(measure.done) || input.measured?.name !== AIMING || state.leftAt === null) return undefined

  return keep(menuShape.leftAt.set(state, null), [act.sendUp(TRIGGER, AIM, { point: state.leftAt, measured: input.measured })])
})

const entering = listening<MenuSnapshot>([focus.enter, focus.move], (state, input) => {
  if (!input.is(focus.enter) && !input.is(focus.move)) return undefined
  if (collection.has(state.collection, input.key)) return keep(menuShape.staying.set(menuShape.active.set(state, input.key), null))
  if (input.part === CONTENT) return keep(menuShape.staying.set(menuShape.active.set(state, null), null))

  return undefined
})

const forgetting = (state: MenuSnapshot, input: Input<string>) => search(state, input) ?? keep(state)

const leaving = listening<MenuSnapshot>([focus.leave], (state, input) => {
  if (!input.is(focus.leave)) return undefined

  const forgotten = forgetting(state, input)
  if (!state.shown) return forgotten

  return keep(closed(forgotten.state), [...forgotten.actions, ...HIDE])
})

const escaping = (closing: readonly MenuAction[]) => listening<MenuSnapshot>([key.escape], (state, input) => {
  if (!input.is(key.escape) || !state.shown) return undefined

  return handled(closed(state), closing)
})

const backingOut = listening<MenuSnapshot>([nav.crossBackward], (state, input) => {
  if (!input.is(nav.crossBackward) || !state.shown || input.part !== CONTENT) return undefined

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

  const staying = data.kind === 'checkbox' || data.kind === 'radio' ? input.key : null

  return handled(menuShape.staying.set(state, staying), [act.click(input.key)])
})

const checking = (key: string, data: MenuItemData) => {
  if (data.kind === 'checkbox') return [act.sendAt(key, CHECK)]
  if (data.kind === 'radio') return [act.sendAt(key, CHECK, { value: data.value })]

  return []
}

const pressing = (closing: readonly MenuAction[]) => listening<MenuSnapshot>([pointer.press], (state, input) => {
  const data = dataOf(state, input.key)
  if (!input.is(pointer.press) || data === undefined || input.key === undefined) return undefined

  const next = menuShape.staying.set(state, null)
  if (data.disabled) return handled(next)
  if (state.staying === input.key || data.keepOpen) return keep(next, checking(input.key, data))

  return keep(closed(next), [...checking(input.key, data), ...closing])
})

const dismissing = (closing: readonly MenuAction[]) => listening<MenuSnapshot>([DISMISS], (state, input) => {
  if (!input.is(DISMISS)) return undefined

  return keep(closed(state), closing)
})

const aiming = listening<MenuSnapshot>([AIM, timer(AIMING)], (state, input) => {
  if (input.is(timer(AIMING))) return keep(menuShape.aim.set(state, null))

  const rect = input.measured?.parts[CONTENT]?.rect
  if (!input.is(AIM) || input.point === undefined || rect === undefined) return undefined

  return keep(menuShape.aim.set(state, { from: input.point, rect }), [act.timer(AIMING, AIM_GRACE)])
})

const hovering = listening<MenuSnapshot>([pointer.hover], (state, input) => {
  const data = dataOf(state, input.key)
  if (!input.is(pointer.hover) || data === undefined || input.key === undefined) return undefined
  if (state.aim !== null && input.point !== undefined && aims(state.aim, input.point)) return keep(state)

  const next = menuShape.aim.set(state, null)
  if (data.disabled || input.key === state.active) return state.aim === null ? undefined : keep(next)

  return keep(menuShape.active.set(next, input.key), [act.focus(input.key, { preventScroll: true, focusVisible: false })])
})

const summoned = (state: MenuSnapshot, point: Point) => {
  const first = collection.first(state.collection)
  const next = menuShape.point.set(menuShape.active.set(menuShape.open.set(state, true), first), point)
  const focusing = first === null ? [] : [act.focus(first)]

  return { state: next, actions: [act.cancelTimer(HOLDING), act.showPopover(ANCHOR), ...SHOW, ...focusing] }
}

const summoning = listening<MenuSnapshot>([browser.contextMenu], (state, input) => {
  if (!input.is(browser.contextMenu)) return undefined
  if (input.part !== TRIGGER || input.point === undefined) return handled(state)

  const { state: next, actions } = summoned(state, input.point)

  return handled(next, actions)
})

const returning = listening<MenuSnapshot>([focus.move], (state, input) => {
  if (!input.is(focus.move) || input.part !== TRIGGER || !state.shown) return undefined

  return keep(closed(state), HIDE)
})

const strayed = (from: Point, to: Point) => Math.hypot(to.x - from.x, to.y - from.y) > HOLD_SLOP

const holding = listening<MenuSnapshot>([pointer.down, pointer.drag, pointer.release, pointer.cancel, timer(HOLDING)], (state, input) => {
  const armed = state.timers.has(HOLDING)

  if (input.is(timer(HOLDING))) {
    if (state.point === null) return keep(state)

    const { state: next, actions } = summoned(state, state.point)

    return keep(next, [act.claimPointer(), ...actions])
  }
  if (input.is(pointer.down)) {
    if (input.part !== TRIGGER || input.pointerType !== 'touch' || !input.primary || input.textEntry || input.point === undefined) return undefined

    return keep(menuShape.point.set(state, input.point), [act.timer(HOLDING, HOLD_DELAY)])
  }
  if (!armed) return undefined
  if (input.is(pointer.drag)) {
    if (state.point === null || input.point === undefined || !strayed(state.point, input.point)) return keep(state)

    return keep(state, [act.cancelTimer(HOLDING)])
  }
  if (input.is(pointer.release) || input.is(pointer.cancel)) return keep(state, [act.cancelTimer(HOLDING)])

  return undefined
})

export const itemPart = menuShape.part(
  (state, key) => [dataOf(state, key)?.kind ?? 'item', dataOf(state, key)?.disabled ?? false] as const,
  ([kind, disabled]) => ({ role: ROLES[kind], tabIndex: -1, 'aria-disabled': disabled || undefined }),
)

const contentPart = menuShape.part(
  (state) => [idOf(state, CONTENT), idOf(state, TRIGGER)] as const,
  ([id, triggerId]) => ({ id, role: 'menu', tabIndex: -1, 'aria-labelledby': triggerId }),
)

export const menuWidget = defineWidget({
  state: menuShape,

  step: [
    following,
    toggling(true),
    fromTrigger,
    entering,
    leaving,
    escaping(CLOSE_ALL),
    tabbingBack,
    spacing,
    pressing(CLOSE_ALL),
    dismissing(CLOSE_ALL),
    aiming,
    hovering,
    inside(search),
    inside(moving),
  ],

  output: {
    trigger: menuShape.part(
      (state) => [idOf(state, TRIGGER), idOf(state, CONTENT), state.shown] as const,
      ([id, contentId, shown]) => ({ id, 'aria-haspopup': 'menu', 'aria-expanded': shown, 'aria-controls': contentId, popoverTarget: contentId, 'data-open': shown }),
    ),
    content: contentPart,
    item: itemPart,
  },
})

export const submenuWidget = defineWidget({
  state: menuShape,

  step: [
    following,
    toggling(false),
    fromParent,
    resting,
    departing,
    measured,
    entering,
    leaving,
    escaping(CLOSE_ALL),
    backingOut,
    spacing,
    pressing(CLOSE_UP),
    dismissing(CLOSE_UP),
    aiming,
    hovering,
    inside(search),
    inside(moving),
  ],

  output: {
    trigger: menuShape.part(
      (state) => [idOf(state, TRIGGER), idOf(state, CONTENT), state.shown] as const,
      ([id, contentId, shown]) => ({ id, 'aria-haspopup': 'menu', 'aria-expanded': shown, 'aria-controls': contentId, 'data-open': shown }),
    ),
    content: contentPart,
    item: itemPart,
  },
})

export const contextMenuWidget = defineWidget({
  state: menuShape,

  step: [
    following,
    toggling(true),
    summoning,
    holding,
    entering,
    leaving,
    returning,
    escaping(HIDE),
    spacing,
    pressing(HIDE),
    dismissing(HIDE),
    aiming,
    hovering,
    inside(search),
    inside(moving),
  ],

  output: {
    trigger: menuShape.part(
      (state) => [state.shown] as const,
      ([shown]) => ({ 'data-open': shown }),
    ),
    content: menuShape.part(
      (state) => [idOf(state, CONTENT)] as const,
      ([id]) => ({ id, role: 'menu', tabIndex: -1 }),
    ),
    item: itemPart,
    anchor: {
      ...menuShape.part(() => [] as const, () => ({})),
      live: menuShape.part(
        (state) => [state.point?.x, state.point?.y] as const,
        ([x, y]) => ({ '--context-menu-x': x === undefined ? undefined : `${x}px`, '--context-menu-y': y === undefined ? undefined : `${y}px` }),
      ),
    },
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
