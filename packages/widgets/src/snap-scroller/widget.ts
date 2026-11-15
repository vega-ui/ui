import { Action, act, collection, command, defineWidget, Entry, Input, internal, keep, layout, lifecycle, listening, matching, measure, Metrics, pointer, ROOT, ScrollBox, scroll, source, state, Step } from '@vega-ui/core'
import { getOffsetIndexes } from '@vega-ui/utils'

export type SnapScrollerEntry = Entry<number, undefined>

export interface SnapPages {
  readonly start: number
  readonly size: number
  readonly shift: number
}

export const MEASURE_SNAP = command('measureSnap')
export const SNAP_NEXT = command('snapNext')
export const SNAP_PREVIOUS = command('snapPrevious')
export const SNAP_TO = command('snapTo')
export const SNAP_INDEX = command('snapIndex')

const OFFSETS = 'snapOffsets'

const entries = source({
  key: (entry: SnapScrollerEntry) => entry.key,
})

type Offset = readonly [key: number, left: number]

export interface Anchor {
  readonly key: number
  readonly delta: number
}

export interface Queued {
  readonly key: number
  readonly behavior?: ScrollBehavior
}

export const snapScrollerShape = state({
  options: {
    items: [] as readonly SnapScrollerEntry[],
    defaultIndex: undefined as number | undefined,
    pages: undefined as SnapPages | undefined,
    index: undefined as number | undefined,
    preserveScroll: true as boolean,
    onSnapChanging: undefined as ((index: number) => void) | undefined,
    onSnapChange: undefined as ((index: number) => void) | undefined,
    onOffset: undefined as ((value: number) => void) | undefined,
  },
  owns: {},
  follows: ['items', 'index'],
  internal: {
    offsets: internal([] as readonly Offset[]),
    left: internal(0),
    committed: internal(null as number | null),
    pending: internal(null as number | null),
    target: internal(null as number | null),
    shown: internal(false),
    window: internal(null as readonly number[] | null),
    followedIndex: internal(null as number | null),
    anchor: internal(null as Anchor | null),
    queued: internal(null as Queued | null),
    announced: internal(null as number | null),
  },
  observes: { rtl: matching(ROOT, ':dir(rtl)') },
  collection: (options) => entries.of(options.items),
})

type SnapScrollerSnapshot = typeof snapScrollerShape.__snapshot

interface Outcome {
  readonly state: SnapScrollerSnapshot
  readonly actions: readonly Action<number>[]
}

const MEASURE = [act.measure<number>({ name: OFFSETS, parts: [ROOT], items: 'all', rect: true, scroll: true, styles: ['scroll-padding-inline-start'] })]

const centerOf = (pages: SnapPages) => Math.floor(pages.size / 2)

const windowAround = (pages: SnapPages, index: number) => getOffsetIndexes(index - centerOf(pages), 1, pages.size)

const startIndexOf = (state: SnapScrollerSnapshot) => {
  const { pages, index, defaultIndex } = state.options
  if (!pages) return defaultIndex

  return index ?? defaultIndex ?? centerOf(pages) + pages.start
}

export const windowOf = (state: SnapScrollerSnapshot): readonly number[] => {
  if (state.window) return state.window

  const { pages } = state.options
  if (!pages) return []

  return windowAround(pages, startIndexOf(state) ?? 0)
}

const extended = (pages: SnapPages, window: readonly number[], direction: -1 | 1) => {
  if (direction > 0) return [...window, ...getOffsetIndexes(window[window.length - 1] + 1, 1, pages.shift)]

  return [...getOffsetIndexes(window[0] - pages.shift, 1, pages.shift), ...window]
}

const sameKeys = (offsets: readonly Offset[], keys: readonly number[]) => offsets.length === keys.length && offsets.every(([key], index) => key === keys[index])

const measuresItems = (state: SnapScrollerSnapshot) => !sameKeys(state.offsets, state.options.items.map((entry) => entry.key))

const inlineLeft = (scroller: ScrollBox | undefined) => Math.abs(scroller?.left ?? 0)

const offsetOf = (state: SnapScrollerSnapshot, root: Metrics, item: Metrics) => {
  const padding = parseFloat(root.styles?.['scroll-padding-inline-start'] ?? '') || 0
  const left = inlineLeft(root.scroll)
  if (!root.rect || !item.rect) return left

  if (state.rtl) return left + root.rect.x + root.rect.width - item.rect.x - item.rect.width - padding

  return left + item.rect.x - root.rect.x - padding
}

const snappedAt = (offsets: readonly Offset[], left: number) => {
  let snapped: Offset | undefined
  for (const offset of offsets) {
    if (!snapped || Math.abs(offset[1] - left) < Math.abs(snapped[1] - left)) snapped = offset
  }

  return snapped?.[0] ?? null
}

const atEnd = (scroller: ScrollBox) => inlineLeft(scroller) >= scroller.width - scroller.clientWidth - 1

const leftOf = (state: SnapScrollerSnapshot, key: number) => state.offsets.find(([candidate]) => candidate === key)?.[1]

const snapAt = (state: SnapScrollerSnapshot, key: number | null) => snapScrollerShape.pending.set(snapScrollerShape.committed.set(state, key), key)

const reports = (state: SnapScrollerSnapshot, key: number) => state.target === null || state.target === key

const deltaOf = (input: Input<number>) => {
  if (input.is(SNAP_NEXT)) return 1
  if (input.is(SNAP_PREVIOUS)) return -1

  return 0
}

const scrollTo = (state: SnapScrollerSnapshot, inline: number, behavior?: ScrollBehavior) => {
  const left = state.rtl ? -inline : inline

  return act.scrollTo(ROOT, behavior ? { left, behavior } : { left })
}

const anchorAt = (state: SnapScrollerSnapshot, key: number) => {
  const left = leftOf(state, key)
  if (!state.options.preserveScroll || left === undefined) return state

  return snapScrollerShape.anchor.set(state, { key, delta: state.left - left })
}

const scrollToIndex = (state: SnapScrollerSnapshot, key: number, behavior?: ScrollBehavior): Outcome => {
  const left = leftOf(state, key)
  if (left !== undefined && Math.abs(left - state.left) < 1) return { state, actions: [] }

  const targeted = snapScrollerShape.target.set(state, key)
  if (left === undefined) return { state: snapScrollerShape.queued.set(targeted, { key, behavior }), actions: [] }

  const next = behavior === 'instant' ? snapScrollerShape.pending.set(targeted, key) : targeted
  return { state: next, actions: [scrollTo(next, left, behavior)] }
}

const showIndex = (state: SnapScrollerSnapshot, key: number): Outcome => {
  const { pages } = state.options
  if (!pages || windowOf(state).includes(key)) return scrollToIndex(state, key, 'instant')

  const recentered = snapScrollerShape.window.set(state, windowAround(pages, key))
  return { state: snapScrollerShape.queued.set(recentered, { key, behavior: 'instant' }), actions: [] }
}

const follow = (state: SnapScrollerSnapshot): Outcome => {
  const { pages, index } = state.options
  if (!pages || index === undefined || index === state.followedIndex) return { state, actions: [] }

  const followed = snapScrollerShape.followedIndex.set(state, index)
  if (!state.shown) return { state: followed, actions: [] }
  if (index === state.target || index === state.pending || index === state.committed) return { state: followed, actions: [] }

  return showIndex(followed, index)
}

const recenter = (state: SnapScrollerSnapshot, key: number): Outcome => {
  const changed = [act.emit('snapChange', key)]
  if (!reports(state, key)) return { state, actions: changed }

  const settled = snapScrollerShape.target.set(state, null)
  const { pages } = state.options
  if (!pages) return { state: settled, actions: changed }

  const window = windowOf(settled)
  const offset = key === window[0] ? [act.emit('offset', -1)] : []
  const centered = window.length === pages.size && window[centerOf(pages)] === key
  if (centered) return { state: settled, actions: [...offset, ...changed] }

  const recentered = snapScrollerShape.window.set(anchorAt(settled, key), windowAround(pages, key))
  return { state: snapScrollerShape.announced.set(recentered, key), actions: offset }
}

const restore = (state: SnapScrollerSnapshot): Outcome => {
  if (state.options.pages && !sameKeys(state.offsets, windowOf(state))) return { state, actions: [] }

  const actions: Action<number>[] = []
  const { anchor, queued, announced } = state
  const anchorLeft = anchor ? leftOf(state, anchor.key) : undefined

  let next = snapScrollerShape.anchor.set(state, null)
  if (anchor && anchorLeft !== undefined) {
    const left = anchorLeft + anchor.delta
    actions.push(scrollTo(next, left, 'instant'))
    next = snapScrollerShape.left.set(next, left)
  }

  if (queued && leftOf(next, queued.key) !== undefined) {
    const scrolled = scrollToIndex(snapScrollerShape.queued.set(next, null), queued.key, queued.behavior)
    next = scrolled.state
    actions.push(...scrolled.actions)
  }

  if (announced === null) return { state: next, actions }

  return { state: snapScrollerShape.announced.set(next, null), actions: [...actions, act.emit('snapChange', announced)] }
}

const show = (state: SnapScrollerSnapshot, root: Metrics): Outcome => {
  const left = inlineLeft(root.scroll)
  const committed = state.committed !== null && collection.has(state.collection, state.committed)
  const known = committed ? state : snapAt(state, snappedAt(state.offsets, left))
  if (known.shown) return { state: known, actions: [] }

  const shown = snapScrollerShape.shown.set(known, true)
  const start = startIndexOf(shown)
  const startLeft = start === undefined ? undefined : leftOf(shown, start)
  if (start === undefined || startLeft === undefined) return { state: shown, actions: [] }

  return { state: snapAt(shown, start), actions: [scrollTo(shown, startLeft, 'instant')] }
}

const syncing: Step<SnapScrollerSnapshot> = (state, input) => {
  if (input.is(MEASURE_SNAP)) return keep(state, MEASURE)

  if (input.is(lifecycle.connect)) {
    const windowed = state.options.pages ? snapScrollerShape.window.set(state, windowOf(state)) : state
    return keep(windowed, measuresItems(windowed) ? MEASURE : [])
  }

  if (!input.is(lifecycle.options)) return undefined

  const followed = follow(state)
  const measures = measuresItems(followed.state) ? MEASURE : []
  return keep(followed.state, [...followed.actions, ...measures])
}

const resizing = listening<SnapScrollerSnapshot>([layout.resize], (state, input) => (input.is(layout.resize) ? keep(state, MEASURE) : undefined))

const measuring: Step<SnapScrollerSnapshot> = (state, input) => {
  if (!input.is(measure.done) || input.measured?.name !== OFFSETS) return undefined

  const root = input.measured.parts[ROOT]
  if (!root?.rect || !root.scroll || root.rect.width === 0) return keep(state)

  const offsets = input.measured.items.map(([key, item]): Offset => [key, offsetOf(state, root, item)])
  const measured = snapScrollerShape.left.set(snapScrollerShape.offsets.set(state, offsets), inlineLeft(root.scroll))
  const shown = show(measured, root)
  const restored = restore(shown.state)

  return keep(restored.state, [...shown.actions, ...restored.actions])
}

const following = listening<SnapScrollerSnapshot>([scroll.move], (state, input) => {
  if (!input.is(scroll.move) || input.part !== ROOT || !input.scroller) return undefined
  if (state.offsets.length === 0) return keep(state, MEASURE)

  const scrolled = snapScrollerShape.left.set(state, inlineLeft(input.scroller))
  const key = snappedAt(state.offsets, inlineLeft(input.scroller))
  const moved = key === null || key === state.pending ? scrolled : snapScrollerShape.pending.set(scrolled, key)
  const changing = key !== null && key !== state.pending && reports(state, key) ? [act.emit('snapChanging', key)] : []

  const { pages } = state.options
  if (!pages || !atEnd(input.scroller)) return keep(moved, changing)

  const grown = snapScrollerShape.window.set(moved, extended(pages, windowOf(moved), 1))
  return keep(grown, [...changing, act.emit('offset', 1)])
})

const settling = listening<SnapScrollerSnapshot>([scroll.end], (state, input) => {
  if (!input.is(scroll.end) || input.part !== ROOT || !input.scroller) return undefined

  const scrolled = snapScrollerShape.left.set(state, inlineLeft(input.scroller))
  const key = snappedAt(state.offsets, inlineLeft(input.scroller))
  if (key === null || key === state.committed) return keep(scrolled)

  const changing = key !== state.pending && reports(state, key) ? [act.emit('snapChanging', key)] : []
  const settled = recenter(snapAt(scrolled, key), key)

  return keep(settled.state, [...changing, ...settled.actions])
})

const stepping: Step<SnapScrollerSnapshot> = (state, input) => {
  const delta = deltaOf(input)
  if (delta === 0) return undefined

  const base = state.target ?? state.committed
  if (base === null) return keep(state)

  const next = base + delta
  if (leftOf(state, next) !== undefined) {
    const scrolled = scrollToIndex(state, next)
    return keep(scrolled.state, scrolled.actions)
  }

  const { pages } = state.options
  if (!pages) return keep(state)

  const window = windowOf(state)
  const direction = next < window[0] ? -1 : 1
  const grown = snapScrollerShape.window.set(anchorAt(state, window[0]), extended(pages, window, direction))

  return keep(snapScrollerShape.queued.set(snapScrollerShape.target.set(grown, next), { key: next }))
}

const jumping: Step<SnapScrollerSnapshot> = (state, input) => {
  if (!input.is(SNAP_TO) && !input.is(SNAP_INDEX)) return undefined
  if (typeof input.key !== 'number') return keep(state)

  if (input.is(SNAP_INDEX)) {
    const shown = showIndex(state, input.key)
    return keep(shown.state, shown.actions)
  }

  const left = leftOf(state, input.key)
  if (left === undefined) return keep(state)

  const behavior = input.value as ScrollBehavior | undefined
  const next = behavior === 'instant' ? snapScrollerShape.pending.set(state, input.key) : state

  return keep(next, [scrollTo(next, left, behavior)])
}

const releasing = listening<SnapScrollerSnapshot>([pointer.wheel, pointer.down], (state, input) => {
  if (!input.is(pointer.wheel) && !input.is(pointer.down)) return undefined
  if (state.target === null) return undefined

  return keep(snapScrollerShape.target.set(state, null))
})

export const snapScrollerWidget = defineWidget({
  state: snapScrollerShape,

  step: [syncing, resizing, measuring, following, settling, stepping, jumping, releasing],

  output: {},
})
