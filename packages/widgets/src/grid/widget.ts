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

export type GridValue<K extends GridKey = GridKey> = K | null | readonly K[]

export interface GridCellData {
  readonly row: number
  readonly col: number
  readonly excluded: boolean
  readonly disabled: boolean
  readonly selectable: boolean
  readonly interactive: boolean
}

export type GridEntry<K extends GridKey = GridKey> = Entry<K, GridCellData>

export const FOCUS = command('focus')
export const ACTIVATE_WITHIN = command('activateWithin')

export interface GridBaseOptions<K extends GridKey> {
  readonly entries: readonly GridEntry<K>[]
  readonly cells: readonly GridLayoutCell<K>[] | undefined
  readonly wrap: GridWrap | undefined
  readonly exclude: GridKeys<K> | undefined
  readonly disabled: GridKeys<K> | undefined
  readonly readOnly: boolean | undefined
  readonly selection: GridSelection | undefined
  readonly min: K | undefined
  readonly max: K | undefined
  readonly compare: ((first: K, second: K) => number) | undefined
  readonly resolveRange: ((start: K, end: K) => K[]) | undefined
  readonly getNextKey: ((intent: GridIntent, from: K, next: K | undefined) => K | undefined) | undefined
}

export const gridOptions = <K extends GridKey>(): GridBaseOptions<K> => ({
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

export const gridInternal = <K extends GridKey>() => ({
  extension: internal(null as Extension<K> | null),
  anchor: internal(null as K | null),
  gesture: internal<Gesture<K>>(IDLE_GESTURE),
})

export interface GridState<K extends GridKey = GridKey> extends Browser, Identified {
  readonly options: GridBaseOptions<K> & ControlledOptions<{ value: Controlled<GridValue<K>> }>
  readonly collection: Collection<K>
  readonly timers: ReadonlyMap<string, number>
  readonly value: GridValue<K>
  readonly extension: Extension<K> | null
  readonly anchor: K | null
  readonly gesture: Gesture<K>
}

export interface GridShape<K extends GridKey = GridKey> extends AnyShape {
  readonly __snapshot: GridState<K>
  readonly __key: K
}

export interface GridLayoutInputs<K extends GridKey> {
  readonly entries: readonly GridEntry<K>[]
  readonly cells: readonly GridLayoutCell<K>[] | undefined
  readonly exclude: GridKeys<K> | undefined
  readonly compare: ((first: K, second: K) => number) | undefined
}

export interface GridLaid<K extends GridKey> {
  readonly inputs: GridLayoutInputs<K>
  readonly layout: GridLayout<K>
  readonly data: ReadonlyMap<K, GridCellData>
  isExcluded(key: K): boolean
}

export interface GridLayouts<K extends GridKey> {
  layoutFor(inputs: GridLayoutInputs<K>): GridLaid<K>
  laidOf(collection: Collection<K>): GridLaid<K>
}

const sameInputs = <K extends GridKey>(first: GridLayoutInputs<K>, second: GridLayoutInputs<K>) =>
  first.entries === second.entries && first.cells === second.cells && first.exclude === second.exclude && first.compare === second.compare

export const createGridLayouts = <K extends GridKey>(): GridLayouts<K> => {
  const byEntries = new WeakMap<readonly GridEntry<K>[], GridLaid<K>>()
  const byCollection = new WeakMap<object, GridLaid<K>>()

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

export interface GridRules<S extends GridState<K>, K extends GridKey> {
  readonly active: Field<S, K | undefined>
  readonly value: Field<S, GridValue<K>>
  readonly anchor: Field<S, K | null>
  readonly extension: Field<S, Extension<K> | null>
  readonly gesture: Field<S, Gesture<K>>
  readonly layouts: GridLayouts<K>
  next?(state: S, intent: GridIntent, from: K, found: K | undefined): K | undefined
}

export interface GridWidget<K extends GridKey = GridKey> {
  readonly output: { readonly root: Part<GridState<K>, K>; readonly cell: Part<GridState<K>, K> }
  layoutOf(state: GridState<K>): GridLayout<K>
  isExcluded(state: GridState<K>, key: K): boolean
  isDisabled(state: GridState<K>, key: K): boolean
  isSelected(state: GridState<K>, key: K): boolean
  rangeOf(state: GridState<K>, key: K): GridRangePosition | undefined
  tabStop(state: GridState<K>): K | undefined
}

export interface GridLogic<S extends GridState<K>, K extends GridKey> {
  readonly steps: readonly Step<S, K>[]
  readonly output: { readonly root: Part<S, K>; readonly cell: Part<S, K> }
  readonly invariants: Readonly<Record<string, Invariant<S>>>
  layoutOf(state: S): GridLayout<K>
  isExcluded(state: S, key: K): boolean
  isDisabled(state: S, key: K): boolean
  isSelected(state: S, key: K): boolean
  rangeOf(state: S, key: K): GridRangePosition | undefined
  tabStop(state: S): K | undefined
  navigable(state: S, key: K | undefined): key is K
  activate(state: S, key: K): S
  activateWithin(state: S, keys: readonly K[]): S
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

const isKeyList = <K extends GridKey>(value: GridValue<K>): value is readonly K[] => Array.isArray(value)

export const keysOf = <K extends GridKey>(value: GridValue<K>): readonly K[] => {
  if (isKeyList(value)) return value
  return value === null ? [] : [value]
}

export const createGridLogic = <S extends GridState<K>, K extends GridKey>(rules: GridRules<S, K>): GridLogic<S, K> => {
  const { layouts } = rules

  const laidOf = (state: S) => layouts.laidOf(state.collection)
  const layoutOf = (state: S) => laidOf(state).layout
  const dataOf = (state: S, target: K) => laidOf(state).data.get(target)

  let matcherFor: { keys: GridKeys<K> | undefined; matches: (target: K) => boolean } | undefined

  const matcherOf = (keys: GridKeys<K> | undefined) => {
    if (!matcherFor || matcherFor.keys !== keys) matcherFor = { keys, matches: createKeyMatcher(keys) }

    return matcherFor.matches
  }

  const isOutside = (state: S, target: K) => {
    const { min, max } = state.options
    const { compare } = layoutOf(state)
    if (min !== undefined && compare(target, min) < 0) return true

    return max !== undefined && compare(target, max) > 0
  }

  const isExcluded = (state: S, target: K) => layoutOf(state).cells.get(target)?.excluded ?? laidOf(state).isExcluded(target)

  const isDisabled = (state: S, target: K) => dataOf(state, target)?.disabled === true || matcherOf(state.options.disabled)(target) || isOutside(state, target)

  const navigable = (state: S, target: K | undefined): target is K => target !== undefined && layoutOf(state).cells.get(target)?.excluded === false

  const accepts = (state: S, target: K) => layoutOf(state).cells.get(target)?.selectable !== false

  const selectable = (state: S, target: K | undefined): target is K => state.options.selection !== undefined && navigable(state, target) && accepts(state, target) && !isDisabled(state, target)

  const activeField: Field<S, K | null> = {
    name: 'active',
    get: (state) => rules.active.get(state) ?? null,
    set: (state, target) => rules.active.set(state, target ?? undefined),
  }

  const writeValue = (state: S, keys: readonly K[]) => rules.value.set(state, state.options.selection === 'single' ? keys[0] ?? null : keys)

  const valueField: Field<S, readonly K[]> = {
    name: 'value',
    get: (state) => keysOf(rules.value.get(state)),
    set: (state, keys) => {
      if (state.options.readOnly) return state

      return writeValue(state, keys)
    },
  }

  const nextOf = rules.next ?? ((state: S, intent: GridIntent, from: K, found: K | undefined) => (state.options.getNextKey ? state.options.getNextKey(intent, from, found) : found))

  const next = (state: S, from: K, intent: GridIntent) => nextOf(state, intent, from, gridNeighbor(layoutOf(state), from, intent, state.options.wrap))

  const tabStops = new WeakMap<object, K | undefined>()

  const initialTabStop = (state: S) => {
    const active = rules.active.get(state)
    if (active !== undefined && !laidOf(state).isExcluded(active)) return active

    const value = rules.value.get(state)
    const single = state.options.selection === 'single' && !isKeyList(value) && value !== null ? value : undefined
    return single !== undefined && !laidOf(state).isExcluded(single) ? single : undefined
  }

  const findTabStop = (state: S): K | undefined => {
    const { keys } = layoutOf(state)
    if (keys.length === 0) return initialTabStop(state)

    const active = rules.active.get(state)
    if (navigable(state, active)) return active

    return keys.find((target) => isSelected(state, target)) ?? keys[0]
  }

  const tabStop = (state: S): K | undefined => {
    if (tabStops.has(state)) return tabStops.get(state)

    const found = findTabStop(state)
    tabStops.set(state, found)

    return found
  }

  const select = selection<S, K>({
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
    resolveRange: (state, start, end) => state.options.resolveRange?.(start, end),
    all: (state) => {
      const { resolveRange } = state.options
      if (!resolveRange) return layoutOf(state).keys.filter((target) => selectable(state, target))

      const from = tabStop(state)
      const first = from === undefined ? undefined : next(state, from, 'gridStart')
      const last = from === undefined ? undefined : next(state, from, 'gridEnd')
      if (first === undefined || last === undefined) return keysOf(rules.value.get(state))

      return layoutOf(state).compare(first, last) > 0 ? resolveRange(last, first) : resolveRange(first, last)
    },
  })

  const isSelected = (state: S, target: K): boolean => {
    if (!selectable(state, target)) return false
    if (state.options.selection === 'single') return rules.value.get(state) === target

    return select.isSelected(state, target)
  }

  const rangeOf = (state: S, target: K): GridRangePosition | undefined => {
    const edges = select.edges(state)
    if (!edges || edges[0] === edges[1] || !isSelected(state, target)) return undefined
    if (target === edges[0]) return 'start'
    if (target === edges[1]) return 'end'

    return 'between'
  }

  const activate = (state: S, target: K) => rules.active.set(state, target)

  const activateWithin = (state: S, keys: readonly K[]) => {
    const current = tabStop(state)
    if (current !== undefined && keys.includes(current)) return state

    const found = keys.find((target) => navigable(state, target))
    return found === undefined ? state : activate(state, found)
  }

  const commands: Step<S, K> = (state, input) => {
    if (input.is(FOCUS)) {
      const target = input.key ?? tabStop(state)
      if (target === undefined) return handled(state)

      return handled(input.key === undefined ? state : activate(state, input.key), [act.focus(target)])
    }

    if (input.is(ACTIVATE_WITHIN)) return keep(activateWithin(state, input.keys ?? []))

    return undefined
  }

  const content = listening<S, K>([key.enter, key.f2, key.escape, key.tab, SHIFT_TAB], (state, input) => {
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

  const following: Step<S, K> = (state, input) => {
    if (!input.is(focus.enter) && !input.is(focus.move)) return undefined

    return keep(navigable(state, input.key) ? activate(state, input.key) : state)
  }

  const moving = listening<S, K>(INTENTS.flatMap(([spec]) => [spec, key.with(spec, mod.shift)]), (state, input) => {
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

  const entering = listening<S, K>([key.enter], (state, input) => {
    if (!input.is(key.enter) || !selectable(state, input.key)) return undefined

    return handled(select.toggle(state, input.key))
  })

  const pointing = listening<S, K>([pointer.down, pointer.dragOver, pointer.press], (state, input) => {
    if (input.is(pointer.down)) {
      const reset = rules.gesture.set(state, IDLE_GESTURE)
      if (!navigable(state, input.key)) return keep(reset)

      return keep(select.press(activate(reset, input.key), input.key))
    }

    if (input.is(pointer.dragOver)) {
      if (!navigable(state, input.key) || !accepts(state, input.key)) return keep(state)

      const dragged = select.drag(state, input.key)
      if (dragged === state) return keep(state)

      return keep(activate(dragged, input.key), [act.focus(input.key, true)])
    }

    if (input.is(pointer.press)) {
      if (rules.gesture.get(state).phase === 'dragged') return keep(rules.gesture.set(state, IDLE_GESTURE))
      if (input.inside || !selectable(state, input.key)) return undefined

      return keep(select.toggle(state, input.key))
    }

    return undefined
  })

  const root: Part<S, K> = {
    select: (state) => [state.options.selection, state.options.readOnly],
    render: ([mode, readOnly]) => ({ role: 'grid', 'aria-multiselectable': mode === 'multiple' || mode === 'range' || undefined, 'aria-readonly': readOnly || undefined }),
  }

  const cell: Part<S, K> = {
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

  const invariants: Record<string, Invariant<S>> = {
    valueSelectable: {
      check: (state) => state.options.selection === undefined || keysOf(rules.value.get(state)).every((target) => !layoutOf(state).cells.has(target) || selectable(state, target)),
      repair: (state) => writeValue(state, keysOf(rules.value.get(state)).filter((target) => !layoutOf(state).cells.has(target) || selectable(state, target))),
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

export const createGrid = <K extends GridKey = GridKey>() => {
  const layouts = createGridLayouts<K>()

  const shape = state({
    options: gridOptions<K>(),
    owns: {
      active: controlled(undefined as K | undefined),
      value: controlled(null as GridValue<K>),
    },
    internal: gridInternal<K>(),
    collection: ({ entries, cells, exclude, compare }) => layouts.layoutFor({ entries, cells, exclude, compare }).layout.collection,
  })

  const logic = createGridLogic<typeof shape.__snapshot, K>({
    active: shape.active,
    value: shape.value,
    anchor: shape.anchor,
    extension: shape.extension,
    gesture: shape.gesture,
    layouts,
  })

  const { steps, invariants, ...view } = logic

  return { ...defineWidget({ state: shape, step: steps, output: logic.output, invariants }), ...view, emptyOptions: gridOptions<K>() }
}

export type GridSnapshot<K extends GridKey = GridKey> = ReturnType<typeof createGrid<K>>['shape']['__snapshot']
