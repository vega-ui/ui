import { act, collection, command, controlled, defineWidget, Entry, focus, handled, Input, internal, keep, key, lifecycle, listening, nav, pointer, ROOT, source, state, Step, timer, TYPEAHEAD } from '@vega-ui/core'
import { SNAP_TO } from '../snap-scroller'

export type WheelPickerValue = string | number

export interface WheelPickerItemData {
  readonly value: WheelPickerValue
  readonly disabled?: boolean
  readonly label: string
}

export type WheelPickerEntry = Entry<number, WheelPickerItemData>

export const SETTLE = command<{ readonly key: number }>()('settle')

const entries = source({
  key: (entry: WheelPickerEntry) => entry.key,
  disabled: (entry) => entry.data.disabled ?? false,
  label: (entry) => entry.data.label,
})

export const wheelPickerShape = state({
  options: {
    items: [] as readonly WheelPickerEntry[],
    loop: false,
    page: 5,
    scrollTimeline: true,
    disabled: false,
    readOnly: false,
  },
  follows: ['items'],
  owns: { value: controlled(null as WheelPickerValue | null) },
  internal: { index: internal(null as number | null), pending: internal(null as number | null), typed: internal(''), count: internal(0) },
  collection: (options) => entries.of(options.items),
  parts: [ROOT],
})

type WheelPickerSnapshot = typeof wheelPickerShape.__snapshot

const DELAY = 500

const LOOP_MARGIN = 15

const CENTER = '--wheel-picker-center'

const countOf = (state: WheelPickerSnapshot) => state.options.items.length

const wrap = (index: number, count: number) => ((index % count) + count) % count

const positionAt = (state: WheelPickerSnapshot, index: number) => (state.options.loop ? wrap(index, countOf(state)) : index)

const enabledAt = (state: WheelPickerSnapshot, position: number) => {
  const item = state.options.items[position]
  return item !== undefined && !item.data.disabled
}

const getInitialPosition = (items: readonly WheelPickerEntry[], value: WheelPickerValue | null | undefined) => {
  const selected = items.findIndex((item) => item.data.value === value)
  if (selected !== -1) return selected

  return Math.max(0, items.findIndex((item) => !item.data.disabled))
}

export const getRowCount = (count: number, loop: boolean) => {
  if (!loop || count === 0) return count

  return count + 2 * LOOP_MARGIN
}

const centeredIn = (index: number, count: number, loop: boolean) => {
  if (!loop || count === 0) return index

  const middle = (getRowCount(count, loop) - 1) / 2
  return index + Math.round((middle - index) / count) * count
}

export const getInitialIndex = (items: readonly WheelPickerEntry[], value: WheelPickerValue | null | undefined, loop: boolean) =>
  centeredIn(getInitialPosition(items, value), items.length, loop)

const centered = (state: WheelPickerSnapshot, index: number) => centeredIn(index, countOf(state), state.options.loop)

const turnTo = (index: number, smooth: boolean) => act.send(ROOT, SNAP_TO, { key: index, value: smooth ? 'animated' : 'instant' })

const selectedPositionOf = (state: WheelPickerSnapshot) => getInitialPosition(state.options.items, state.value)

const indexOf = (state: WheelPickerSnapshot) => state.index ?? selectedPositionOf(state)

const nearestIndex = (state: WheelPickerSnapshot, position: number) => {
  if (!state.options.loop) return position

  const from = indexOf(state)
  const count = countOf(state)
  const delta = wrap(position - wrap(from, count), count)

  return delta > count / 2 ? from + delta - count : from + delta
}

const enabledFrom = (state: WheelPickerSnapshot, index: number, direction: 1 | -1) => {
  const count = countOf(state)
  for (let offset = 0; offset < count; offset++) {
    const candidate = index + offset * direction
    if (!state.options.loop && (candidate < 0 || candidate >= count)) return undefined
    if (enabledAt(state, positionAt(state, candidate))) return candidate
  }

  return undefined
}

const clampIndex = (state: WheelPickerSnapshot, index: number) => {
  if (state.options.loop) return index

  return Math.min(countOf(state) - 1, Math.max(0, index))
}

const steppedIndex = (state: WheelPickerSnapshot, delta: number) => {
  const direction = delta > 0 ? 1 : -1
  const moved = clampIndex(state, indexOf(state) + delta)

  return enabledFrom(state, moved, direction) ?? enabledFrom(state, moved, direction === 1 ? -1 : 1)
}

const nearestEnabled = (state: WheelPickerSnapshot, index: number) => {
  const forward = enabledFrom(state, index, 1)
  const backward = enabledFrom(state, index, -1)
  if (forward === undefined) return backward
  if (backward === undefined) return forward

  return forward - index <= index - backward ? forward : backward
}

const select = (state: WheelPickerSnapshot, index: number) => {
  const item = state.options.items[positionAt(state, index)]
  const indexed = wheelPickerShape.index.set(state, index)
  if (!item) return indexed

  return wheelPickerShape.value.set(indexed, item.data.value)
}

const aim = (state: WheelPickerSnapshot, index: number) => {
  const from = indexOf(state)
  if (index === from) return { state, index, actions: [] }

  const rendered = index >= 0 && index < getRowCount(countOf(state), state.options.loop)
  const smooth = rendered && Math.abs(index - from) <= state.options.page
  const target = smooth ? index : centered(state, index)
  return { state: wheelPickerShape.pending.set(state, target), index: target, actions: [turnTo(target, smooth)] }
}

const settling: Step<WheelPickerSnapshot> = (state, input) => {
  if (!input.is(SETTLE) || typeof input.key !== 'number') return undefined
  if (countOf(state) === 0) return keep(state)

  const settled = input.key
  if (state.pending !== null && positionAt(state, settled) !== positionAt(state, state.pending)) return keep(state)

  const row = centered(state, settled)
  const shift = row === settled ? [] : [turnTo(row, false)]
  const landed = wheelPickerShape.pending.set(wheelPickerShape.index.set(state, row), null)
  if (enabledAt(landed, positionAt(landed, row))) return keep(select(landed, row), shift)

  const enabled = nearestEnabled(landed, row)
  if (enabled === undefined) return keep(landed, shift)

  const aimed = aim(landed, enabled)
  return keep(select(aimed.state, aimed.index), [...shift, ...aimed.actions])
}

const releasing = listening<WheelPickerSnapshot>([pointer.down, pointer.wheel], (state, input) => {
  if (!input.is(pointer.down) && !input.is(pointer.wheel)) return undefined
  if (state.pending === null) return undefined

  return keep(wheelPickerShape.pending.set(state, null))
})

const locked = (state: WheelPickerSnapshot) => state.options.disabled || state.options.readOnly || countOf(state) === 0

const edgeIndex = (state: WheelPickerSnapshot, last: boolean) => {
  const count = countOf(state)
  const positions = Array.from({ length: count }, (_, step) => (last ? count - 1 - step : step))
  const position = positions.find((candidate) => enabledAt(state, candidate))
  if (position === undefined) return undefined

  return nearestIndex(state, position)
}

const indexFor = (state: WheelPickerSnapshot, input: Input) => {
  if (input.is(key.arrowUp)) return steppedIndex(state, 1)
  if (input.is(key.arrowDown)) return steppedIndex(state, -1)
  if (input.is(nav.pageBackward)) return steppedIndex(state, state.options.page)
  if (input.is(nav.pageForward)) return steppedIndex(state, -state.options.page)
  if (input.is(nav.first)) return edgeIndex(state, false)
  if (input.is(nav.last)) return edgeIndex(state, true)

  return undefined
}

const stepping = listening<WheelPickerSnapshot>([key.arrowUp, key.arrowDown, nav.pageBackward, nav.pageForward, nav.first, nav.last], (state, input) => {
  if (locked(state)) return undefined

  const next = indexFor(state, input)
  if (next === undefined) return undefined

  const aimed = aim(state, next)
  return handled(select(aimed.state, aimed.index), aimed.actions)
})

const expire = timer(TYPEAHEAD)

const searching = listening<WheelPickerSnapshot>([key.printable, focus.leave], (state, input) => {
  if (input.is(expire)) return handled(wheelPickerShape.typed.set(state, ''))
  if (input.is(focus.leave)) return state.typed === '' ? undefined : keep(wheelPickerShape.typed.set(state, ''), [act.cancelTimer(TYPEAHEAD)])
  if (locked(state) || !input.is(key.printable) || input.char === undefined) return undefined

  const text = (state.timers.has(TYPEAHEAD) ? state.typed : '') + input.char
  const repeated = [...text].every((char) => char === input.char)
  const found = collection.findByLabel(state.collection, repeated ? input.char : text, positionAt(state, indexOf(state)), !repeated)
  const typed = wheelPickerShape.typed.set(state, text)
  if (found === null) return handled(typed, [act.timer(TYPEAHEAD, DELAY)])

  const next = nearestIndex(state, found)
  const aimed = aim(typed, next)
  return handled(select(aimed.state, aimed.index), [act.timer(TYPEAHEAD, DELAY), ...aimed.actions])
})

const pressing = listening<WheelPickerSnapshot>([pointer.press], (state, input) => {
  if (!input.is(pointer.press) || typeof input.key !== 'number' || locked(state)) return undefined
  if (!enabledAt(state, positionAt(state, input.key)) || input.key === indexOf(state)) return undefined

  const aimed = aim(state, input.key)
  return keep(aimed.state, aimed.actions)
})

const valueListed = (state: WheelPickerSnapshot) => state.value === null || state.options.items.some((item) => item.data.value === state.value)

const jump = (state: WheelPickerSnapshot, index: number) => keep(wheelPickerShape.pending.set(wheelPickerShape.index.set(state, index), index), [turnTo(index, false)])

const following: Step<WheelPickerSnapshot> = (state, input) => {
  if (input.is(lifecycle.connect)) {
    const counted = wheelPickerShape.count.set(state, countOf(state))
    return keep(wheelPickerShape.index.set(counted, getInitialIndex(state.options.items, state.value, state.options.loop)))
  }
  if (!input.is(lifecycle.options)) return undefined

  const count = countOf(state)
  const counted = wheelPickerShape.count.set(state, count)
  if (count === 0) return keep(counted)

  if (!valueListed(state)) {
    const previous = state.options.loop && state.count > 0 ? wrap(indexOf(state), state.count) : indexOf(state)
    const row = centered(state, Math.min(previous, count - 1))
    const moved = jump(counted, row)
    return keep(moved.state, [...moved.actions, act.send(ROOT, SETTLE, { key: row })])
  }

  if (state.count !== count) return jump(counted, centered(state, selectedPositionOf(state)))

  const position = selectedPositionOf(state)
  if (position === positionAt(state, indexOf(state))) return keep(counted)

  const aimed = aim(counted, nearestIndex(state, position))
  return keep(wheelPickerShape.index.set(aimed.state, aimed.index), aimed.actions)
}

const cylinderOf = (state: WheelPickerSnapshot) => {
  const count = countOf(state)
  if (state.options.scrollTimeline || count === 0) return []

  const { loop, page } = state.options
  const rows = getRowCount(count, loop)
  const first = loop ? (page - 1) / 2 : 0
  const last = loop ? rows - (page + 1) / 2 : rows - 1
  return [act.scrubWithScroll(ROOT, { keyframes: [{ [CENTER]: first }, { [CENTER]: last }] })]
}

const drawing: Step<WheelPickerSnapshot> = (state, input) => {
  const followed = following(state, input)
  if (!followed) return undefined

  return { ...followed, actions: [...followed.actions, ...cylinderOf(followed.state)] }
}

export const wheelPickerWidget = defineWidget({
  state: wheelPickerShape,

  step: [drawing, settling, releasing, stepping, searching, pressing],

  output: {
    root: wheelPickerShape.part(
      (state) => [selectedPositionOf(state), countOf(state), state.options.items[selectedPositionOf(state)]?.data.label, state.options.disabled, state.options.readOnly] as const,
      ([position, count, label, disabled, readOnly]) => ({
        role: 'spinbutton',
        'aria-valuenow': count === 0 ? undefined : position,
        'aria-valuemin': count === 0 ? undefined : 0,
        'aria-valuemax': count === 0 ? undefined : count - 1,
        'aria-valuetext': label,
        'aria-disabled': disabled || undefined,
        'aria-readonly': readOnly || undefined,
        'data-disabled': disabled || undefined,
        'data-readonly': readOnly || undefined,
      }),
    ),
  },
})
