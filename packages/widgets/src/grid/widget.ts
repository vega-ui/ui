import {
  act,
  AnyShape,
  Browser,
  Collection,
  command,
  controlled,
  Controlled,
  ControlledOptions,
  createGridLayout,
  defineWidget,
  Entry,
  Extension,
  Field,
  focus,
  Gesture,
  gridBetween,
  GridIntent,
  GridLayout,
  gridNeighbor,
  GridWrap,
  handled,
  Identified,
  IDLE_GESTURE,
  Input,
  InputSpec,
  internal,
  Invariant,
  keep,
  key,
  listening,
  mod,
  nav,
  Part,
  pointer,
  selection,
  state,
  Step,
} from '@vega-ui/core'
import { createKeyMatcher } from '@vega-ui/utils'
import { GridKey, GridKeys, GridLayoutCell, GridRangePosition, GridSelection } from './types'

export type GridValue<Key extends GridKey = GridKey> = Key | null | readonly Key[]

export interface GridCellData {
  readonly row: number
  readonly col: number
  readonly excluded: boolean
  readonly disabled: boolean
  readonly selectable: boolean
  readonly interactive: boolean
}

export type GridEntry<Key extends GridKey = GridKey> = Entry<Key, GridCellData>

export const FOCUS = command('focus')
export const ACTIVATE_WITHIN = command('activateWithin')

export interface GridBaseOptions<Key extends GridKey> {
  readonly entries: readonly GridEntry<Key>[]
  readonly cells: readonly GridLayoutCell<Key>[] | undefined
  readonly wrap: GridWrap | undefined
  readonly exclude: GridKeys<Key> | undefined
  readonly disabled: GridKeys<Key> | undefined
  readonly readOnly: boolean | undefined
  readonly selection: GridSelection | undefined
  readonly min: Key | undefined
  readonly max: Key | undefined
  readonly compare: ((first: Key, second: Key) => number) | undefined
  readonly resolveRange: ((start: Key, end: Key) => Key[]) | undefined
  readonly getNextKey: ((intent: GridIntent, from: Key, next: Key | undefined) => Key | undefined) | undefined
}

export const gridOptions = <Key extends GridKey>(): GridBaseOptions<Key> => ({
  entries: [],
  cells: undefined,
  wrap: undefined,
  exclude: undefined,
  disabled: undefined,
  readOnly: undefined,
  selection: undefined,
  min: undefined,
  max: undefined,
  compare: undefined,
  resolveRange: undefined,
  getNextKey: undefined,
})

export const gridInternal = <Key extends GridKey>() => ({
  extension: internal(null as Extension<Key> | null),
  anchor: internal(null as Key | null),
  gesture: internal<Gesture<Key>>(IDLE_GESTURE),
})

export interface GridState<Key extends GridKey = GridKey> extends Browser, Identified {
  readonly options: GridBaseOptions<Key> & ControlledOptions<{ value: Controlled<GridValue<Key>> }>
  readonly collection: Collection<Key>
  readonly timers: ReadonlyMap<string, number>
  readonly value: GridValue<Key>
  readonly extension: Extension<Key> | null
  readonly anchor: Key | null
  readonly gesture: Gesture<Key>
}

export interface GridShape<Key extends GridKey = GridKey> extends AnyShape {
  readonly __snapshot: GridState<Key>
  readonly __key: Key
}

export interface GridLayoutInputs<Key extends GridKey> {
  readonly entries: readonly GridEntry<Key>[]
  readonly cells: readonly GridLayoutCell<Key>[] | undefined
  readonly exclude: GridKeys<Key> | undefined
  readonly compare: ((first: Key, second: Key) => number) | undefined
}

export interface GridLaid<Key extends GridKey> {
  readonly inputs: GridLayoutInputs<Key>
  readonly layout: GridLayout<Key>
  readonly data: ReadonlyMap<Key, GridCellData>
  isExcluded(key: Key): boolean
}

export interface GridLayouts<Key extends GridKey> {
  layoutFor(inputs: GridLayoutInputs<Key>): GridLaid<Key>
  laidOf(collection: Collection<Key>): GridLaid<Key>
}

const sameInputs = <Key extends GridKey>(first: GridLayoutInputs<Key>, second: GridLayoutInputs<Key>) =>
  first.entries === second.entries && first.cells === second.cells && first.exclude === second.exclude && first.compare === second.compare

export const createGridLayouts = <Key extends GridKey>(): GridLayouts<Key> => {
  const byEntries = new WeakMap<readonly GridEntry<Key>[], GridLaid<Key>>()
  const byCollection = new WeakMap<object, GridLaid<Key>>()

  return {
    layoutFor(inputs) {
      const cached = byEntries.get(inputs.entries)
      if (cached && sameInputs(cached.inputs, inputs)) return cached

      const data = new Map(inputs.entries.map((entry) => [entry.key, entry.data]))
      const positions = inputs.cells ?? inputs.entries.map((entry) => ({ key: entry.key, row: entry.data.row, col: entry.data.col }))
      const isExcluded = createKeyMatcher(inputs.exclude)
      const layout = createGridLayout({ positions, flags: data, isExcluded, compare: inputs.compare })
      const laid = { inputs, layout, data, isExcluded }
      byEntries.set(inputs.entries, laid)
      byCollection.set(layout.collection, laid)

      return laid
    },

    laidOf: (collection) => byCollection.get(collection)!,
  }
}

export interface GridRules<State extends GridState<Key>, Key extends GridKey> {
  readonly active: Field<State, Key | undefined>
  readonly value: Field<State, GridValue<Key>>
  readonly anchor: Field<State, Key | null>
  readonly extension: Field<State, Extension<Key> | null>
  readonly gesture: Field<State, Gesture<Key>>
  readonly layouts: GridLayouts<Key>
  next?(state: State, intent: GridIntent, from: Key, found: Key | undefined): Key | undefined
}

export interface GridWidget<Key extends GridKey = GridKey> {
  readonly output: { readonly root: Part<GridState<Key>, Key>; readonly cell: Part<GridState<Key>, Key> }
  layoutOf(state: GridState<Key>): GridLayout<Key>
  isExcluded(state: GridState<Key>, key: Key): boolean
  isDisabled(state: GridState<Key>, key: Key): boolean
  isSelected(state: GridState<Key>, key: Key): boolean
  rangeOf(state: GridState<Key>, key: Key): GridRangePosition | undefined
  tabStop(state: GridState<Key>): Key | undefined
}

export interface GridLogic<State extends GridState<Key>, Key extends GridKey> {
  readonly steps: readonly Step<State, Key>[]
  readonly output: { readonly root: Part<State, Key>; readonly cell: Part<State, Key> }
  readonly invariants: Readonly<Record<string, Invariant<State>>>
  layoutOf(state: State): GridLayout<Key>
  isExcluded(state: State, key: Key): boolean
  isDisabled(state: State, key: Key): boolean
  isSelected(state: State, key: Key): boolean
  rangeOf(state: State, key: Key): GridRangePosition | undefined
  tabStop(state: State): Key | undefined
  navigable(state: State, key: Key | undefined): key is Key
  activate(state: State, key: Key): State
  activateWithin(state: State, keys: readonly Key[]): State
}

const SELECT_KEYS = [key.space]

const INTENTS: readonly (readonly [InputSpec, GridIntent])[] = [
  [nav.forward, 'forward'],
  [nav.backward, 'backward'],
  [nav.down, 'down'],
  [nav.up, 'up'],
  [nav.first, 'rowStart'],
  [nav.last, 'rowEnd'],
  [key.with(nav.first, mod.mod), 'gridStart'],
  [key.with(nav.last, mod.mod), 'gridEnd'],
  [nav.pageForward, 'pageDown'],
  [nav.pageBackward, 'pageUp'],
]

const SHIFT_TAB = key.with(key.tab, mod.shift)

const intentOf = (input: Input): { intent: GridIntent; extending: boolean } | undefined => {
  for (const [spec, intent] of INTENTS) {
    if (input.is(spec)) return { intent, extending: false }
    if (input.is(key.with(spec, mod.shift))) return { intent, extending: true }
  }

  return undefined
}

const cellTabIndex = (excluded: boolean, active: boolean) => {
  if (excluded) return undefined
  return active ? 0 : -1
}

const isKeyList = <Key extends GridKey>(value: GridValue<Key>): value is readonly Key[] => Array.isArray(value)

export const keysOf = <Key extends GridKey>(value: GridValue<Key>): readonly Key[] => {
  if (isKeyList(value)) return value
  return value === null ? [] : [value]
}

export const createGridLogic = <State extends GridState<Key>, Key extends GridKey>(rules: GridRules<State, Key>): GridLogic<State, Key> => {
  const { layouts } = rules

  const laidOf = (state: State) => layouts.laidOf(state.collection)
  const layoutOf = (state: State) => laidOf(state).layout
  const dataOf = (state: State, target: Key) => laidOf(state).data.get(target)

  let matcherFor: { keys: GridKeys<Key> | undefined; matches: (target: Key) => boolean } | undefined

  const matcherOf = (keys: GridKeys<Key> | undefined) => {
    if (!matcherFor || matcherFor.keys !== keys) matcherFor = { keys, matches: createKeyMatcher(keys) }

    return matcherFor.matches
  }

  const isOutside = (state: State, target: Key) => {
    const { min, max } = state.options
    const { compare } = layoutOf(state)
    if (min !== undefined && compare(target, min) < 0) return true

    return max !== undefined && compare(target, max) > 0
  }

  const isExcluded = (state: State, target: Key) => layoutOf(state).cells.get(target)?.excluded ?? laidOf(state).isExcluded(target)

  const isDisabled = (state: State, target: Key) => dataOf(state, target)?.disabled === true || matcherOf(state.options.disabled)(target) || isOutside(state, target)

  const navigable = (state: State, target: Key | undefined): target is Key => target !== undefined && layoutOf(state).cells.get(target)?.excluded === false

  const accepts = (state: State, target: Key) => layoutOf(state).cells.get(target)?.selectable !== false

  const selectable = (state: State, target: Key | undefined): target is Key => state.options.selection !== undefined && navigable(state, target) && accepts(state, target) && !isDisabled(state, target)

  const keepsSelected = (state: State, target: Key) => !layoutOf(state).cells.has(target) || selectable(state, target)

  const activeField: Field<State, Key | null> = {
    name: 'active',
    get: (state) => rules.active.get(state) ?? null,
    set: (state, target) => rules.active.set(state, target ?? undefined),
  }

  const writeValue = (state: State, keys: readonly Key[]) => rules.value.set(state, state.options.selection === 'single' ? keys[0] ?? null : keys)

  const valueField: Field<State, readonly Key[]> = {
    name: 'value',
    get: (state) => keysOf(rules.value.get(state)),
    set: (state, keys) => {
      if (state.options.readOnly) return state

      return writeValue(state, keys)
    },
  }

  const nextOf = rules.next ?? ((state: State, intent: GridIntent, from: Key, found: Key | undefined) => (state.options.getNextKey ? state.options.getNextKey(intent, from, found) : found))

  const next = (state: State, from: Key, intent: GridIntent) => nextOf(state, intent, from, gridNeighbor(layoutOf(state), from, intent, state.options.wrap))

  const tabStops = new WeakMap<object, Key | undefined>()

  const initialTabStop = (state: State) => {
    const active = rules.active.get(state)
    if (active !== undefined && !laidOf(state).isExcluded(active)) return active

    const value = rules.value.get(state)
    const single = state.options.selection === 'single' && !isKeyList(value) && value !== null ? value : undefined
    return single !== undefined && !laidOf(state).isExcluded(single) ? single : undefined
  }

  const findTabStop = (state: State): Key | undefined => {
    const { keys } = layoutOf(state)
    if (keys.length === 0) return initialTabStop(state)

    const active = rules.active.get(state)
    if (navigable(state, active)) return active

    return keys.find((target) => isSelected(state, target)) ?? keys[0]
  }

  const tabStop = (state: State): Key | undefined => {
    if (tabStops.has(state)) return tabStops.get(state)

    const found = findTabStop(state)
    tabStops.set(state, found)

    return found
  }

  const select = selection<State, Key>({
    value: valueField,
    active: activeField,
    anchor: rules.anchor,
    extension: rules.extension,
    gesture: rules.gesture,
    mode: { get: (state) => state.options.selection },
    strategy: 'focus',
    keys: SELECT_KEYS,
    extend: 'range',
    selectable,
    compare: (state, first, second) => layoutOf(state).compare(first, second),
    between: (state, from, to) => gridBetween(layoutOf(state), from, to),
    resolveRange: (state, start, end) => state.options.resolveRange?.(start, end)?.filter((target) => keepsSelected(state, target)),
    all: (state) => {
      const { resolveRange } = state.options
      if (!resolveRange) return layoutOf(state).keys.filter((target) => selectable(state, target))

      const from = tabStop(state)
      const first = from === undefined ? undefined : next(state, from, 'gridStart')
      const last = from === undefined ? undefined : next(state, from, 'gridEnd')
      if (first === undefined || last === undefined) return keysOf(rules.value.get(state))

      const resolved = layoutOf(state).compare(first, last) > 0 ? resolveRange(last, first) : resolveRange(first, last)
      return resolved.filter((target) => keepsSelected(state, target))
    },
  })

  const isSelected = (state: State, target: Key): boolean => {
    if (!selectable(state, target)) return false
    if (state.options.selection === 'single') return rules.value.get(state) === target

    return select.isSelected(state, target)
  }

  const rangeOf = (state: State, target: Key): GridRangePosition | undefined => {
    const edges = select.edges(state)
    if (!edges || edges[0] === edges[1] || !isSelected(state, target)) return undefined
    if (target === edges[0]) return 'start'
    if (target === edges[1]) return 'end'

    return 'between'
  }

  const activate = (state: State, target: Key) => rules.active.set(state, target)

  const activateWithin = (state: State, keys: readonly Key[]) => {
    const current = tabStop(state)
    if (current !== undefined && keys.includes(current)) return state

    const found = keys.find((target) => navigable(state, target))
    return found === undefined ? state : activate(state, found)
  }

  const commands: Step<State, Key> = (state, input) => {
    if (input.is(FOCUS)) {
      const target = input.key ?? tabStop(state)
      if (target === undefined) return handled(state)

      return handled(input.key === undefined ? state : activate(state, input.key), [act.focus(target)])
    }

    if (input.is(ACTIVATE_WITHIN)) return keep(activateWithin(state, input.keys ?? []))

    return undefined
  }

  const content = listening<State, Key>([key.enter, key.f2, key.escape, key.tab, SHIFT_TAB], (state, input) => {
    if ((input.type !== 'key' && input.type !== 'nav') || input.key === undefined) return undefined

    if (!input.inside) {
      if (input.content && (input.is(key.enter) || input.is(key.f2))) return handled(state, [act.focusInside(input.key, 'first')])
      return undefined
    }

    if (input.is(key.escape)) return handled(state, [act.focus(input.key)])
    if (input.is(key.tab)) return handled(state, [act.focusInside(input.key, 'next')])
    if (input.is(SHIFT_TAB)) return handled(state, [act.focusInside(input.key, 'previous')])

    return keep(state)
  })

  const following: Step<State, Key> = (state, input) => {
    if (!input.is(focus.enter) && !input.is(focus.move)) return undefined

    return keep(navigable(state, input.key) ? activate(state, input.key) : state)
  }

  const moving = listening<State, Key>(INTENTS.flatMap(([spec]) => [spec, key.with(spec, mod.shift)]), (state, input) => {
    const found = intentOf(input)
    if (!found) return undefined

    const from = navigable(state, input.key) ? input.key : tabStop(state)
    if (from === undefined) return handled(state)

    const to = next(state, from, found.intent)
    if (to === undefined || to === from) return handled(state)

    const moved = activate(state, to)
    const extended = found.extending && accepts(state, to) ? select.extend(moved, from, to) : moved

    return handled(extended, [act.focus(to)])
  })

  const entering = listening<State, Key>([key.enter], (state, input) => {
    if (!input.is(key.enter) || !selectable(state, input.key)) return undefined

    return handled(select.toggle(state, input.key))
  })

  const pointing = listening<State, Key>([pointer.down, pointer.dragOver, pointer.press], (state, input) => {
    if (input.is(pointer.down)) {
      const reset = rules.gesture.set(state, IDLE_GESTURE)
      if (!navigable(state, input.key)) return keep(reset)

      return keep(select.press(activate(reset, input.key), input.key))
    }

    if (input.is(pointer.dragOver)) {
      if (!navigable(state, input.key) || !accepts(state, input.key)) return keep(state)

      const dragged = select.drag(state, input.key)
      if (dragged === state) return keep(state)

      return keep(activate(dragged, input.key), [act.focus(input.key, { preventScroll: true })])
    }

    if (input.is(pointer.press)) {
      if (rules.gesture.get(state).phase === 'dragged') return keep(rules.gesture.set(state, IDLE_GESTURE))
      if (input.inside || !selectable(state, input.key)) return undefined

      return keep(select.toggle(state, input.key))
    }

    return undefined
  })

  const root: Part<State, Key> = {
    select: (state) => [state.options.selection, state.options.readOnly],
    render: ([mode, readOnly]) => ({ role: 'grid', 'aria-multiselectable': mode === 'multiple' || mode === 'range' || undefined, 'aria-readonly': readOnly || undefined }),
  }

  const cell: Part<State, Key> = {
    select: (state, target) => {
      const laid = layoutOf(state).cells.get(target)
      const selectableCell = laid?.selectable ?? true
      const withSelection = state.options.selection !== undefined && selectableCell

      return [
        cellTabIndex(isExcluded(state, target), tabStop(state) === target),
        withSelection ? isSelected(state, target) : undefined,
        selectableCell ? isDisabled(state, target) : undefined,
        rangeOf(state, target),
        dataOf(state, target)?.interactive === true,
      ]
    },
    render: ([tabIndex, selected, disabled, range, interactive]) => ({
      role: interactive ? undefined : 'gridcell',
      'aria-disabled': disabled,
      'aria-selected': selected,
      'data-range': range,
      tabIndex,
    }),
  }

  const invariants: Record<string, Invariant<State>> = {
    valueSelectable: {
      check: (state) => state.options.selection === undefined || keysOf(rules.value.get(state)).every((target) => keepsSelected(state, target)),
      repair: (state) => writeValue(state, keysOf(rules.value.get(state)).filter((target) => keepsSelected(state, target))),
    },
    gestureOwned: {
      check: (state) => {
        const { pointed } = rules.gesture.get(state)
        return pointed === undefined || layoutOf(state).cells.has(pointed)
      },
      repair: (state) => rules.gesture.set(state, IDLE_GESTURE),
    },
  }

  return {
    steps: [commands, content, following, moving, entering, pointing, select],
    output: { root, cell },
    invariants,
    layoutOf,
    isExcluded,
    isDisabled,
    isSelected,
    rangeOf,
    tabStop,
    navigable,
    activate,
    activateWithin,
  }
}

export const createGrid = <Key extends GridKey = GridKey>() => {
  const layouts = createGridLayouts<Key>()

  const shape = state({
    options: gridOptions<Key>(),
    owns: {
      active: controlled(undefined as Key | undefined),
      value: controlled(null as GridValue<Key>),
    },
    internal: gridInternal<Key>(),
    collection: ({ entries, cells, exclude, compare }) => layouts.layoutFor({ entries, cells, exclude, compare }).layout.collection,
  })

  const logic = createGridLogic<typeof shape.__snapshot, Key>({
    active: shape.active,
    value: shape.value,
    anchor: shape.anchor,
    extension: shape.extension,
    gesture: shape.gesture,
    layouts,
  })

  const { steps, invariants, ...view } = logic

  return { ...defineWidget({ state: shape, step: steps, output: logic.output, invariants }), ...view, emptyOptions: gridOptions<Key>() }
}

export type GridSnapshot<Key extends GridKey = GridKey> = ReturnType<typeof createGrid<Key>>['shape']['__snapshot']
