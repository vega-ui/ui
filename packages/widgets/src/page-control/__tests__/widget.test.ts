import { describe, expect, it, vi } from 'vitest'
import { act, key, measure, pointer } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { currentTabOf, PageControlEntry, pageControlWidget } from '../widget'

const pages = (indexes: readonly number[], disabled: readonly number[] = []): readonly PageControlEntry[] =>
  indexes.map((index) => ({ key: index, data: { disabled: disabled.includes(index) } }))

const dots = (indexes: readonly number[]) => ({
  measured: { name: 'scrub', parts: {}, items: indexes.map((index) => [index, { rect: { x: index * 20, y: 0, width: 10, height: 10 } }] as const) },
})

describe('Critical User Paths', () => {
  it('moves the active page with the arrows and the edges, focusing it and wrapping around the ends', () => {
    const onChangeActive = vi.fn()
    const pageControl = simulate(pageControlWidget, { items: pages([0, 1, 2]), defaultActive: 0, onChangeActive }, { orientation: 'horizontal' })

    pageControl.send(key.arrowRight)
    expect(pageControl.state.active).toBe(1)
    expect(pageControl.actions).toEqual([act.focus(1)])
    expect(onChangeActive).toHaveBeenLastCalledWith(1)

    pageControl.send(key.end).send(key.arrowRight)
    expect(pageControl.state.active).toBe(0)
    expect(pageControl.actions).toEqual([act.focus(0)])

    pageControl.send(key.arrowLeft)
    expect(pageControl.state.active).toBe(2)
  })

  it('follows a finger sliding over the pages', () => {
    const pageControl = simulate(pageControlWidget, { items: pages([0, 1, 2]), defaultActive: 0 })

    pageControl.send(pointer.drag, { pointerType: 'touch', point: { x: 45, y: 30 } })
    expect(pageControl.actions).toEqual([act.measure({ name: 'scrub', items: 'all', rect: true })])

    pageControl.send(measure.done, dots([0, 1, 2]))
    expect(pageControl.state.active).toBe(2)
    expect(pageControl.actions).toEqual([act.focus(2)])

    pageControl.send(pointer.drag, { pointerType: 'touch', point: { x: 32, y: 30 } }).send(measure.done, dots([0, 1, 2]))
    expect(pageControl.state.active).toBe(2)

    pageControl.send(pointer.drag, { pointerType: 'mouse', point: { x: 5, y: 0 } })
    expect(pageControl.actions).toEqual([])
  })
})

describe('Edge Cases', () => {
  it('reports a pressed page to a controlled parent once and nothing for the active page', () => {
    const onChangeActive = vi.fn()
    const pageControl = simulate(pageControlWidget, { items: pages([0, 1, 2]), active: 1, onChangeActive })

    pageControl.send(pointer.down, { key: 1 })
    expect(onChangeActive).not.toHaveBeenCalled()

    pageControl.send(pointer.down, { key: 2 })
    expect(onChangeActive).toHaveBeenCalledExactlyOnceWith(2)
  })

  it('wraps around past a disabled page at the ends', () => {
    const pageControl = simulate(pageControlWidget, { items: pages([0, 1, 2], [0, 2]), defaultActive: 1 }, { orientation: 'horizontal' })

    pageControl.send(key.arrowRight)
    expect(pageControl.state.active).toBe(1)

    pageControl.send(key.arrowLeft)
    expect(pageControl.state.active).toBe(1)
  })

  it('steps over a gap in the indexes and over a disabled page', () => {
    const pageControl = simulate(pageControlWidget, { items: pages([0, 1, 3, 4], [3]), defaultActive: 1 }, { orientation: 'horizontal' })

    pageControl.send(key.arrowRight)
    expect(pageControl.state.active).toBe(4)

    pageControl.send(pointer.drag, { pointerType: 'pen', point: { x: 65, y: 0 } }).send(measure.done, dots([0, 1, 3, 4]))
    expect(pageControl.state.active).toBe(4)
  })
})

describe('Accessibility', () => {
  it('marks a page the item forces as current like the active tab, with aria-current, and a forced other page like an inactive one', () => {
    const active = pageControlWidget.output.tab.render(pageControlWidget.output.tab.select(simulate(pageControlWidget, { items: pages([0]), defaultActive: 0 }).state, 0))

    expect(currentTabOf(true)).toEqual({ ...active, 'aria-current': 'page' })
    expect(currentTabOf(false)).toEqual({ role: 'tab', tabIndex: -1, 'aria-selected': false, 'data-active': false, 'aria-current': undefined })
  })
})
