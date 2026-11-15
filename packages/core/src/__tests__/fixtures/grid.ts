import { controlled, internal, state } from '../../state'
import { createGridLayout, Extension, Gesture, gridBetween, GridCellPosition, GridLayout, gridNeighbor, GridWrap, IDLE_GESTURE, selection, SelectionMode } from '../../fragments'
import { act, handled, keep, listening, Step } from '../../step'
import { focus, key, mod, nav, pointer } from '../../input'
import { defineWidget } from '../../widget'

export const cellAt = (row: number, col: number) => `${row}:${col}`

export const cells3x3: readonly GridCellPosition<string>[] = [0, 1, 2].flatMap((row) => [0, 1, 2].map((col) => ({ key: cellAt(row, col), row, col })))

const layouts = new WeakMap<object, GridLayout<string>>()

const layoutFor = (cells: readonly GridCellPosition<string>[], excluded: readonly string[], disabled: readonly string[]) => {
  const layout = createGridLayout({ positions: cells, isExcluded: (target) => excluded.includes(target) })
  layouts.set(layout.collection, layout)
  Object.assign(layout, { disabled })

  return layout
}

export const shape = state({
  options: {
    cells: cells3x3,
    excluded: [] as readonly string[],
    disabled: [] as readonly string[],
    wrap: undefined as GridWrap | undefined,
    mode: undefined as SelectionMode | undefined,
  },
  owns: {
    active: controlled(null as string | null),
    value: controlled([] as readonly string[]),
  },
  internal: {
    anchor: internal(null as string | null),
    extension: internal(null as Extension<string> | null),
    gesture: internal<Gesture<string>>(IDLE_GESTURE),
  },
  collection: ({ cells, excluded, disabled }) => layoutFor(cells, excluded, disabled).collection,
})

type State = typeof shape.__snapshot

export const layoutOf = (current: State) => layouts.get(current.collection)!

const navigable = (current: State, target: string | undefined): target is string => target !== undefined && layoutOf(current).cells.get(target)?.excluded === false

const selectable = (current: State, target: string) => navigable(current, target) && !current.options.disabled.includes(target)

export const select = selection<State, string>({
  value: shape.value,
  active: shape.active,
  anchor: shape.anchor,
  extension: shape.extension,
  gesture: shape.gesture,
  mode: shape.options.mode,
  strategy: 'focus',
  extend: 'range',
  selectable,
  compare: (current, first, second) => layoutOf(current).compare(first, second),
  between: (current, from, to) => gridBetween(layoutOf(current), from, to),
})

const INTENTS = [
  [nav.forward, 'forward'],
  [nav.backward, 'backward'],
  [nav.down, 'down'],
  [nav.up, 'up'],
  [nav.first, 'rowStart'],
  [nav.last, 'rowEnd'],
] as const

const moving = listening<State>(INTENTS.flatMap(([spec]) => [spec, key.with(spec, mod.shift)]), (current, input) => {
  for (const [spec, intent] of INTENTS) {
    const extending = input.is(key.with(spec, mod.shift))
    if (!input.is(spec) && !extending) continue

    const from = current.active
    if (from === null) return handled(current)

    const to = gridNeighbor(layoutOf(current), from, intent, current.options.wrap)
    if (to === undefined) return handled(current)

    const moved = shape.active.set(current, to)
    return handled(extending ? select.extend(moved, from, to) : moved, [act.focus(to)])
  }

  return undefined
})

const following: Step<State> = (current, input) => {
  if (!input.is(focus.enter) && !input.is(focus.move)) return undefined

  return keep(navigable(current, input.key) ? shape.active.set(current, input.key) : current)
}

const pointing = listening<State>([pointer.down, pointer.dragOver, pointer.press], (current, input) => {
  if (input.is(pointer.down)) {
    if (!navigable(current, input.key)) return keep(current)
    return keep(select.press(shape.active.set(current, input.key), input.key))
  }

  if (input.is(pointer.dragOver)) {
    if (!navigable(current, input.key)) return keep(current)
    const dragged = select.drag(current, input.key)
    return keep(dragged === current ? current : shape.active.set(dragged, input.key))
  }

  if (input.is(pointer.press) && !selectable(current, input.key ?? '')) return keep(current)

  return undefined
})

export const grid = defineWidget({
  state: shape,
  step: [following, moving, pointing, select],
  invariants: {
    activeNavigable: {
      check: (current) => current.active === null || navigable(current, current.active),
      repair: (current) => shape.active.set(current, null),
    },
    valueSelectable: {
      check: (current) => current.value.every((target) => selectable(current, target)),
      repair: (current) => shape.value.set(current, current.value.filter((target) => selectable(current, target))),
    },
  },
})
