import { describe, expect, it } from 'vitest'
import { createGridLayout, gridBetween, gridNeighbor } from '../fragments'
import { key, mod, pointer } from '../input'
import { simulate } from '../test'
import { cellAt, cells3x3, grid } from './fixtures/grid'

const layout = createGridLayout({ positions: cells3x3, isExcluded: (target) => target === cellAt(1, 1) })

describe('Critical User Paths', () => {
  it('finds the neighbours by row and column, skips an excluded cell and stops at the edges without wrap', () => {
    expect(gridNeighbor(layout, cellAt(0, 0), 'forward', undefined)).toBe(cellAt(0, 1))
    expect(gridNeighbor(layout, cellAt(0, 2), 'forward', undefined)).toBeUndefined()
    expect(gridNeighbor(layout, cellAt(0, 1), 'down', undefined)).toBe(cellAt(2, 1))
    expect(gridNeighbor(layout, cellAt(1, 0), 'forward', undefined)).toBe(cellAt(1, 2))
    expect(gridNeighbor(layout, cellAt(1, 1), 'forward', undefined)).toBeUndefined()
  })

  it('wraps to the next row or column and reaches the edges of the row and the grid', () => {
    expect(gridNeighbor(layout, cellAt(0, 2), 'forward', 'horizontal')).toBe(cellAt(1, 0))
    expect(gridNeighbor(layout, cellAt(1, 0), 'backward', 'horizontal')).toBe(cellAt(0, 2))
    expect(gridNeighbor(layout, cellAt(2, 0), 'down', 'vertical')).toBe(cellAt(0, 1))
    expect(gridNeighbor(layout, cellAt(0, 2), 'forward', 'vertical')).toBeUndefined()
    expect(gridNeighbor(layout, cellAt(1, 2), 'rowStart', undefined)).toBe(cellAt(1, 0))
    expect(gridNeighbor(layout, cellAt(1, 0), 'gridEnd', undefined)).toBe(cellAt(2, 2))
    expect(gridNeighbor(layout, cellAt(1, 0), 'pageUp', undefined)).toBe(cellAt(0, 0))
  })

  it('lists the cells between two keys in reading order without the excluded ones', () => {
    expect(gridBetween(layout, cellAt(1, 2), cellAt(0, 1))).toEqual([cellAt(0, 1), cellAt(0, 2), cellAt(1, 0), cellAt(1, 2)])
    expect(gridBetween(layout, cellAt(0, 0), 'missing')).toEqual([])
  })

  it('extends a multiple selection in two dimensions from the most recently selected cell and shrinks it back', () => {
    const widget = simulate(grid, { cells: cells3x3, excluded: [], disabled: [], wrap: undefined, mode: 'multiple', defaultActive: cellAt(0, 1) }, { orientation: 'grid' })

    widget.send(key.space).send(key.with(key.arrowDown, mod.shift))
    expect(widget.state.value).toEqual([cellAt(0, 1), cellAt(0, 2), cellAt(1, 0), cellAt(1, 1)])
    expect(widget.actions).toEqual([{ type: 'focus', key: cellAt(1, 1) }])

    widget.send(key.with(key.arrowUp, mod.shift))
    expect(widget.state.value).toEqual([cellAt(0, 1)])

    widget.send(key.arrowDown).send(key.with(key.arrowRight, mod.shift))
    expect(widget.state.value).toEqual([cellAt(0, 1), cellAt(0, 2), cellAt(1, 0), cellAt(1, 1), cellAt(1, 2)])
  })

  it('keeps a range between its two edges, moves the edge the user holds and never ends on a disabled cell', () => {
    const widget = simulate(grid, { cells: cells3x3, excluded: [], disabled: [cellAt(2, 1)], wrap: undefined, mode: 'range', defaultActive: cellAt(0, 1) }, { orientation: 'grid' })

    widget.send(key.space).send(key.with(key.arrowDown, mod.shift))
    expect(widget.state.value).toEqual([cellAt(0, 1), cellAt(1, 1)])

    widget.send(key.with(key.arrowDown, mod.shift))
    expect(widget.state.active).toBe(cellAt(2, 1))
    expect(widget.state.value).toEqual([cellAt(0, 1), cellAt(1, 1)])

    widget.send(key.arrowLeft).send(key.with(key.arrowUp, mod.shift))
    expect(widget.state.value).toEqual([cellAt(0, 1), cellAt(1, 0)])
  })

  it('selects by dragging from the pressed cell and ignores the click that ends the drag', () => {
    const widget = simulate(grid, { cells: cells3x3, excluded: [], disabled: [], wrap: undefined, mode: 'multiple' }, { orientation: 'grid' })

    widget.send(pointer.down, { key: cellAt(0, 0) }).send(pointer.dragOver, { key: cellAt(1, 1) })
    expect(widget.state.value).toEqual([cellAt(0, 0), cellAt(0, 1), cellAt(0, 2), cellAt(1, 0), cellAt(1, 1)])
    expect(widget.state.gesture.phase).toBe('dragging')

    widget.send(pointer.release, { key: cellAt(1, 1) }).send(pointer.press, { key: cellAt(1, 1) })
    expect(widget.state.value).toEqual([cellAt(0, 0), cellAt(0, 1), cellAt(0, 2), cellAt(1, 0), cellAt(1, 1)])
    expect(widget.state.gesture.phase).toBe('idle')

    widget.send(pointer.down, { key: cellAt(1, 1) }).send(pointer.release, { key: cellAt(1, 1) }).send(pointer.press, { key: cellAt(1, 1) })
    expect(widget.state.value).toEqual([cellAt(0, 0), cellAt(0, 1), cellAt(0, 2), cellAt(1, 0)])
  })

  it('selects every selectable cell with Mod+A', () => {
    const widget = simulate(grid, { cells: cells3x3, excluded: [cellAt(1, 1)], disabled: [cellAt(2, 2)], wrap: undefined, mode: 'multiple', defaultActive: cellAt(0, 0) }, { orientation: 'grid' })

    widget.send(key.with(key.a, mod.mod))
    expect(widget.state.value).toEqual(cells3x3.map((cell) => cell.key).filter((target) => target !== cellAt(1, 1) && target !== cellAt(2, 2)))
  })
})
