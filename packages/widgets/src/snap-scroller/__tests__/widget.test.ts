import { describe, expect, it } from 'vitest'
import { act, createInput, layout, lifecycle, measure, pointer, ROOT, scroll } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { SNAP_INDEX, SNAP_NEXT, SNAP_PREVIOUS, SNAP_TO, SnapPages, snapScrollerWidget, windowOf } from '../widget'

type SnapScrollerOptions = Parameters<typeof simulate<typeof snapScrollerWidget.shape>>[1]

const WIDTH = 100

const MEASURE = act.measure({ name: 'snapOffsets', parts: [ROOT], items: 'all', rect: true, scroll: true, styles: ['scroll-padding-inline-start'] })

const range = (from: number, count: number) => Array.from({ length: count }, (_, index) => from + index)

const itemsOf = (keys: readonly number[]) => keys.map((key) => ({ key, data: undefined }))

const scroller = (left: number, count: number) => ({ top: 0, left, width: count * WIDTH, height: 50, clientWidth: WIDTH, clientHeight: 50 })

const measured = (keys: readonly number[], left: number, { padding = 0, itemWidth = WIDTH, rtl = false } = {}) => ({
  measured: {
    name: 'snapOffsets',
    parts: { [ROOT]: { rect: { x: 0, y: 0, width: WIDTH, height: 50 }, scroll: scroller(left, keys.length), styles: { 'scroll-padding-inline-start': `${padding}px` } } },
    items: keys.map((key, position) => {
      const offset = rtl ? WIDTH - itemWidth - position * itemWidth - left : position * itemWidth - left
      return [key, { rect: { x: offset, y: 0, width: itemWidth, height: 50 } }] as const
    }),
  },
})

const scrolled = (left: number, count: number) => ({ part: ROOT, scroller: scroller(left, count) })

const ROW = 40

const column = (top: number, count: number) => ({ top, left: 0, width: 100, height: count * ROW, clientWidth: 100, clientHeight: ROW })

const measuredColumn = (keys: readonly number[], top: number, padding = 0) => ({
  measured: {
    name: 'snapOffsets',
    parts: { [ROOT]: { rect: { x: 0, y: 0, width: 100, height: ROW }, scroll: column(top, keys.length), styles: { 'scroll-padding-block-start': `${padding}px` } } },
    items: keys.map((key, position) => [key, { rect: { x: 0, y: position * ROW - top + padding, width: 100, height: ROW } }] as const),
  },
})

const scrolledColumn = (top: number, count: number) => ({ part: ROOT, scroller: column(top, count) })

const options = (overrides: Partial<SnapScrollerOptions> = {}): SnapScrollerOptions => ({
  items: itemsOf(range(0, 5)),
  defaultIndex: undefined,
  pages: undefined,
  index: undefined,
  preserveScroll: true,
  orientation: 'horizontal',
  onSnapChanging: undefined,
  onSnapChange: undefined,
  onOffset: undefined,
  ...overrides,
})

const shown = (overrides: Partial<SnapScrollerOptions> = {}) => simulate(snapScrollerWidget, options(overrides)).send(lifecycle.connect).send(measure.done, measured(range(0, 5), 0))

const PAGES: SnapPages = { start: 0, size: 5, shift: 3 }

describe('Critical User Paths', () => {
  it('measures the items once connected and scrolls to the default index at once', () => {
    const snapScroller = simulate(snapScrollerWidget, options({ defaultIndex: 2 }))

    snapScroller.send(lifecycle.connect)
    expect(snapScroller.actions).toEqual([MEASURE])

    snapScroller.send(measure.done, measured(range(0, 5), 0, { padding: 10 }))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: 190, behavior: 'instant' })])
    expect(snapScroller.state.committed).toBe(2)
  })

  it('reports the item a scroll passes as changing and the item it settles at as changed', () => {
    const snapScroller = shown()

    snapScroller.send(scroll.move, scrolled(140, 5))
    expect(snapScroller.state.pending).toBe(1)
    expect(snapScroller.actions).toEqual([act.emit('snapChanging', 1)])

    snapScroller.send(scroll.move, scrolled(160, 5))
    expect(snapScroller.actions).toEqual([act.emit('snapChanging', 2)])

    snapScroller.send(scroll.end, scrolled(200, 5))
    expect(snapScroller.state.committed).toBe(2)
    expect(snapScroller.actions).toEqual([act.emit('snapChange', 2)])
  })

  it('scrolls to the next and the previous item and reports only the target on the way', () => {
    const snapScroller = shown()

    snapScroller.send(createInput(SNAP_NEXT)).send(createInput(SNAP_NEXT))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: 200 })])
    expect(snapScroller.state.target).toBe(2)

    snapScroller.send(scroll.move, scrolled(90, 5))
    expect(snapScroller.actions).toEqual([])

    snapScroller.send(scroll.move, scrolled(190, 5)).send(scroll.end, scrolled(200, 5))
    expect(snapScroller.state.committed).toBe(2)
    expect(snapScroller.state.target).toBe(null)

    snapScroller.send(createInput(SNAP_PREVIOUS))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: 100 })])
  })

  it('scrolls to an item with the given behavior and to an index at once', () => {
    const snapScroller = shown()

    snapScroller.send(createInput(SNAP_TO, { key: 3, value: 'smooth' }))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: 300, behavior: 'smooth' })])

    snapScroller.send(createInput(SNAP_INDEX, { key: 4 }))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: 400, behavior: 'instant' })])
    expect(snapScroller.state.pending).toBe(4)
  })

  it('animates a scroll to an item on the timing of the scroller and reports where it stops, also the item it started from when the user stopped it', () => {
    const snapScroller = shown()

    snapScroller.send(createInput(SNAP_TO, { key: 3, value: 'animated' }))
    expect(snapScroller.actions).toEqual([act.animateScroll(ROOT, { left: 300 })])

    snapScroller.send(scroll.end, scrolled(0, 5))
    expect(snapScroller.actions).toContainEqual(act.emit('snapChange', 0))
  })

  it('moves the window of pages around the settled page and keeps that page in place', () => {
    const snapScroller = simulate(snapScrollerWidget, options({ items: itemsOf(range(0, 5)), pages: PAGES })).send(lifecycle.connect)
    expect(windowOf(snapScroller.state)).toEqual([0, 1, 2, 3, 4])

    snapScroller.send(measure.done, measured(range(0, 5), 0))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: 200, behavior: 'instant' })])

    snapScroller.send(scroll.end, scrolled(300, 5))
    expect(windowOf(snapScroller.state)).toEqual([1, 2, 3, 4, 5])
    expect(snapScroller.actions).toEqual([act.emit('snapChanging', 3)])

    snapScroller.setOptions(options({ items: itemsOf(range(1, 5)), pages: PAGES }))
    expect(snapScroller.actions).toEqual([MEASURE])

    snapScroller.send(measure.done, measured(range(1, 5), 300))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: 200, behavior: 'instant' }), act.emit('snapChange', 3)])
  })
})

describe('Edge Cases', () => {
  it('forgets a page the browser cannot scroll to once the scroll ends short of it, so the next step starts from the shown page', () => {
    const clamped = (left: number) => ({ part: ROOT, scroller: { top: 0, left, width: 500, height: 50, clientWidth: 260, clientHeight: 50 } })
    const snapScroller = shown().send(scroll.end, scrolled(200, 5))

    snapScroller.send(createInput(SNAP_NEXT)).send(scroll.end, clamped(240)).send(createInput(SNAP_PREVIOUS))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: 100 })])

    const scrolledBack = shown().send(scroll.end, scrolled(200, 5)).send(createInput(SNAP_NEXT)).send(scroll.end, clamped(240)).send(scroll.end, clamped(0))
    expect(scrolledBack.actions).toContainEqual(act.emit('snapChanging', 0))

    const stopped = shown().send(createInput(SNAP_NEXT)).send(createInput(SNAP_NEXT))
    stopped.send(scroll.end, { part: ROOT, scroller: { top: 0, left: 120, width: 500, height: 50, clientWidth: 380, clientHeight: 50 } })
    expect(stopped.actions).toContainEqual(act.emit('snapChanging', 1))
  })

  it('keeps the page it scrolls to when a scroll ends on the way there, so quick steps add up', () => {
    const snapScroller = shown().send(createInput(SNAP_NEXT))

    snapScroller.send(scroll.end, scrolled(0, 5)).send(createInput(SNAP_NEXT))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: 200 })])
  })

  it('does not scroll to the item it already shows and keeps reporting the scroll of the user', () => {
    const snapScroller = shown()

    snapScroller.send(createInput(SNAP_INDEX, { key: 0 }))
    expect(snapScroller.actions).toEqual([])

    snapScroller.send(scroll.move, scrolled(90, 5))
    expect(snapScroller.actions).toEqual([act.emit('snapChanging', 1)])
  })

  it('keeps the scroll position where the browser leaves it when the window moves without preserveScroll', () => {
    const snapScroller = simulate(snapScrollerWidget, options({ pages: PAGES, preserveScroll: false })).send(lifecycle.connect).send(measure.done, measured(range(0, 5), 0))

    snapScroller.send(scroll.end, scrolled(300, 5)).setOptions(options({ items: itemsOf(range(1, 5)), pages: PAGES, preserveScroll: false }))
    snapScroller.send(measure.done, measured(range(1, 5), 300))
    expect(snapScroller.actions).toEqual([act.emit('snapChange', 3)])
  })

  it('opens at the index the parent changed before the first measure with one scroll', () => {
    const snapScroller = simulate(snapScrollerWidget, options({ pages: PAGES, index: 2 })).send(lifecycle.connect)

    snapScroller.setOptions(options({ pages: PAGES, index: 3 }))
    snapScroller.send(measure.done, measured(range(0, 5), 0))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: 300, behavior: 'instant' })])
    expect(snapScroller.state.target).toBe(null)
  })

  it('builds the window of pages around the index, the default index or the middle of the pages', () => {
    const pages = { start: -2, size: 5, shift: 2 }
    const windowFor = (overrides: Partial<SnapScrollerOptions>) => windowOf(simulate(snapScrollerWidget, options({ pages, ...overrides })).send(lifecycle.connect).state)

    expect(windowFor({})).toEqual([-2, -1, 0, 1, 2])
    expect(windowFor({ defaultIndex: 10 })).toEqual([8, 9, 10, 11, 12])
    expect(windowFor({ index: 7 })).toEqual([5, 6, 7, 8, 9])
    expect(windowFor({ pages: { ...pages, size: 1 } })).toEqual([-2])
  })

  it('waits for the first measure before stepping', () => {
    const snapScroller = simulate(snapScrollerWidget, options({ pages: PAGES })).send(lifecycle.connect)

    snapScroller.send(createInput(SNAP_NEXT)).send(createInput(SNAP_PREVIOUS))
    expect(snapScroller.actions).toEqual([])
    expect(snapScroller.state.target).toBe(null)
    expect(windowOf(snapScroller.state)).toEqual([0, 1, 2, 3, 4])
  })

  it('stops at the first and the last item without pages', () => {
    const snapScroller = shown({ defaultIndex: 0 })

    snapScroller.send(createInput(SNAP_PREVIOUS))
    expect(snapScroller.actions).toEqual([])
    expect(snapScroller.state.target).toBe(null)
  })

  it('reports the items a scroll passes again once a wheel or a press takes over a programmatic scroll', () => {
    const snapScroller = shown()

    snapScroller.send(createInput(SNAP_NEXT)).send(createInput(SNAP_NEXT)).send(pointer.down, { part: ROOT })
    expect(snapScroller.state.target).toBe(null)

    snapScroller.send(scroll.move, scrolled(90, 5))
    expect(snapScroller.actions).toEqual([act.emit('snapChanging', 1)])

    snapScroller.send(createInput(SNAP_NEXT)).send(pointer.wheel, { part: ROOT })
    expect(snapScroller.state.target).toBe(null)
  })

  it('finds the snapped item in a right-to-left scroller', () => {
    const snapScroller = simulate(snapScrollerWidget, options()).observe({ rtl: true }).send(lifecycle.connect).send(measure.done, measured(range(0, 5), 0, { itemWidth: 80, rtl: true }))

    snapScroller.send(scroll.end, scrolled(-160, 5))
    expect(snapScroller.state.committed).toBe(2)

    snapScroller.send(createInput(SNAP_NEXT))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: -240 })])
  })

  it('keeps working when the direction changes after the items were measured', () => {
    const snapScroller = simulate(snapScrollerWidget, options()).send(lifecycle.connect).send(measure.done, measured(range(0, 5), 0))

    snapScroller.observe({ rtl: true }).send(createInput(SNAP_NEXT))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: -100 })])

    snapScroller.send(scroll.end, scrolled(-300, 5))
    expect(snapScroller.state.committed).toBe(3)
  })

  it('snaps and scrolls along the block axis in a vertical scroller, after its block padding', () => {
    const snapScroller = simulate(snapScrollerWidget, options({ orientation: 'vertical' })).send(lifecycle.connect)
    expect(snapScroller.actions).toEqual([act.measure({ name: 'snapOffsets', parts: [ROOT], items: 'all', rect: true, scroll: true, styles: ['scroll-padding-block-start'] })])

    snapScroller.send(measure.done, measuredColumn(range(0, 5), 0, 8))
    snapScroller.send(scroll.end, scrolledColumn(80, 5))
    expect(snapScroller.state.committed).toBe(2)

    snapScroller.send(createInput(SNAP_NEXT))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { top: 120 })])
  })

  it('measures the offsets in layout pixels while an ancestor scales the scroller, like a popover that opens', () => {
    const snapScroller = simulate(snapScrollerWidget, options({ orientation: 'vertical', defaultIndex: 3 })).send(lifecycle.connect)
    const scale = 0.9

    snapScroller.send(measure.done, {
      measured: {
        name: 'snapOffsets',
        parts: { [ROOT]: { rect: { x: 0, y: 0, width: 100 * scale, height: ROW * scale }, scroll: { ...column(0, 5), offsetWidth: 100, offsetHeight: ROW }, styles: {} } },
        items: range(0, 5).map((key) => [key, { rect: { x: 0, y: key * ROW * scale, width: 100 * scale, height: ROW * scale } }] as const),
      },
    })

    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { top: 3 * ROW, behavior: 'instant' })])
  })

  it('appends pages once a vertical scroll reaches the bottom of the window', () => {
    const snapScroller = simulate(snapScrollerWidget, options({ orientation: 'vertical', pages: PAGES })).send(lifecycle.connect).send(measure.done, measuredColumn(range(0, 5), 0))

    snapScroller.send(scroll.move, scrolledColumn(160, 5))
    expect(windowOf(snapScroller.state)).toEqual([0, 1, 2, 3, 4, 5, 6, 7])
    expect(snapScroller.actions).toEqual([act.emit('snapChanging', 4), act.emit('offset', 1)])
  })

  it('appends pages once a scroll reaches the end of the window', () => {
    const snapScroller = simulate(snapScrollerWidget, options({ pages: PAGES })).send(lifecycle.connect).send(measure.done, measured(range(0, 5), 0))

    snapScroller.send(scroll.move, scrolled(400, 5))
    expect(windowOf(snapScroller.state)).toEqual([0, 1, 2, 3, 4, 5, 6, 7])
    expect(snapScroller.actions).toEqual([act.emit('snapChanging', 4), act.emit('offset', 1)])
  })

  it('reports an offset back when the scroll settles at the first page', () => {
    const snapScroller = simulate(snapScrollerWidget, options({ pages: PAGES })).send(lifecycle.connect).send(measure.done, measured(range(0, 5), 200))

    snapScroller.send(scroll.end, scrolled(0, 5))
    expect(snapScroller.actions).toEqual([act.emit('snapChanging', 0), act.emit('offset', -1)])
  })

  it('grows the window toward steps past its edge and scrolls to the last step once the new pages are measured', () => {
    const snapScroller = simulate(snapScrollerWidget, options({ items: itemsOf(range(-2, 5)), pages: PAGES, defaultIndex: 0 })).send(lifecycle.connect)
    expect(windowOf(snapScroller.state)).toEqual([-2, -1, 0, 1, 2])

    snapScroller.send(measure.done, measured(range(-2, 5), 0)).send(scroll.end, scrolled(200, 5))
    snapScroller.send(createInput(SNAP_PREVIOUS)).send(createInput(SNAP_PREVIOUS)).send(createInput(SNAP_PREVIOUS))
    expect(windowOf(snapScroller.state)).toEqual([-5, -4, -3, -2, -1, 0, 1, 2])
    expect(snapScroller.actions).toEqual([])

    snapScroller.setOptions(options({ items: itemsOf(range(-5, 8)), pages: PAGES, defaultIndex: 0 })).send(measure.done, measured(range(-5, 8), 200))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: 500, behavior: 'instant' }), act.scrollTo(ROOT, { left: 200 })])
    expect(snapScroller.state.target).toBe(-3)
  })

  it('follows the index the parent changes, moving the window first when the index is outside it', () => {
    const snapScroller = simulate(snapScrollerWidget, options({ pages: PAGES, index: 2 })).send(lifecycle.connect).send(measure.done, measured(range(0, 5), 0))

    snapScroller.setOptions(options({ pages: PAGES, index: 3 }))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: 300, behavior: 'instant' })])

    snapScroller.setOptions(options({ pages: PAGES, index: 20 }))
    expect(windowOf(snapScroller.state)).toEqual([18, 19, 20, 21, 22])
    expect(snapScroller.actions).toEqual([])

    snapScroller.setOptions(options({ items: itemsOf(range(18, 5)), pages: PAGES, index: 20 })).send(measure.done, measured(range(18, 5), 0))
    expect(snapScroller.actions).toEqual([act.scrollTo(ROOT, { left: 200, behavior: 'instant' })])
    expect(snapScroller.state.pending).toBe(20)
  })

  it('measures again on a resize and before the first scroll, and waits while the scroller is hidden', () => {
    const snapScroller = simulate(snapScrollerWidget, options({ items: [] }))

    snapScroller.send(scroll.move, scrolled(0, 5))
    expect(snapScroller.actions).toEqual([MEASURE])

    snapScroller.send(layout.resize)
    expect(snapScroller.actions).toEqual([MEASURE])

    snapScroller.send(measure.done, { measured: { ...measured(range(0, 5), 0).measured, parts: { [ROOT]: { rect: { x: 0, y: 0, width: 0, height: 0 }, scroll: scroller(0, 0) } } } })
    expect(snapScroller.state.offsets).toEqual([])
  })
})
