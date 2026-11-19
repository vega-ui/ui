import { describe, expect, it, vi } from 'vitest'
import { act, createInput, createWidget, DRAGGED, focus, key, mod, pointer, renderPart, timer } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { ACTIVATE_WITHIN, createGrid, FOCUS, GridEntry } from '../widget'

const grid = createGrid<string>()

type GridOptions = Parameters<typeof simulate<typeof grid.shape>>[1]

const KEYS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

const entriesOf = (keys: readonly string[], disabled: readonly string[] = []): GridEntry<string>[] =>
  keys.map((cell, index) => ({ key: cell, data: { row: Math.floor(index / 3), col: index % 3, excluded: false, disabled: disabled.includes(cell), selectable: true } }))

const simulateGrid = (options: Partial<GridOptions> = {}) => simulate(grid, { ...grid.emptyOptions, entries: entriesOf(KEYS), ...options } as GridOptions, { orientation: 'grid' })

describe('Critical User Paths', () => {
  it('moves the active cell with the arrows, the row edges and the grid edges, focusing it and stopping at the edges', () => {
    const onChangeActive = vi.fn()
    const widget = simulateGrid({ defaultActive: 'e', onChangeActive })

    widget.send(key.arrowRight)
    expect(widget.state.active).toBe('f')
    expect(widget.actions).toEqual([act.focus('f')])
    expect(onChangeActive).toHaveBeenLastCalledWith('f')

    widget.send(key.arrowRight)
    expect(widget.state.active).toBe('f')
    expect(widget.actions).toEqual([])

    widget.send(key.arrowDown).send(key.home)
    expect(widget.state.active).toBe('g')

    widget.send(key.with(key.home, mod.mod))
    expect(widget.state.active).toBe('a')

    widget.send(key.with(key.end, mod.mod))
    expect(widget.state.active).toBe('i')
  })

  it('takes the active cell as the tab stop, otherwise the first selected cell, otherwise the first cell', () => {
    expect(grid.tabStop(simulateGrid().state)).toBe('a')
    expect(grid.tabStop(simulateGrid({ selection: 'multiple', defaultValue: ['h', 'c'] }).state)).toBe('c')
    expect(grid.tabStop(simulateGrid({ selection: 'single', defaultValue: 'h', defaultActive: 'e' }).state)).toBe('e')
  })

  it('selects one cell with Space, Enter or a click in single selection, keeps it on a second click and never extends it', () => {
    const onChangeValue = vi.fn()
    const widget = simulateGrid({ selection: 'single', defaultActive: 'a', onChangeValue })

    widget.send(key.with(key.arrowRight, mod.shift))
    expect(widget.state.active).toBe('b')
    expect(widget.state.value).toBe(null)

    widget.send(key.space)
    expect(widget.state.value).toBe('b')
    expect(onChangeValue).toHaveBeenLastCalledWith('b')

    widget.send(key.enter, { key: 'e' })
    expect(widget.state.value).toBe('e')

    widget.pressAt('i').pressAt('i')
    expect(widget.state.value).toBe('i')
    expect(widget.state.active).toBe('i')
    expect(grid.isSelected(widget.state, 'e')).toBe(false)

    widget.send(key.with(key.a, mod.mod))
    expect(widget.answer).toBe('pass')
    expect(widget.state.value).toBe('i')
  })

  it('toggles cells by a click, extends from the anchor with Shift and the arrows, and selects all with Mod+A in multiple selection', () => {
    const widget = simulateGrid({ selection: 'multiple' })

    widget.pressAt('a').pressAt('c')
    expect(widget.state.value).toEqual(['a', 'c'])

    widget.pressAt('a')
    expect(widget.state.value).toEqual(['c'])

    widget.send(key.arrowRight).send(key.arrowRight).send(key.with(key.arrowDown, mod.shift))
    expect(widget.state.active).toBe('f')
    expect(widget.state.value).toEqual(['c', 'd', 'e', 'f'])

    widget.send(key.with(key.arrowUp, mod.shift))
    expect(widget.state.value).toEqual(['c'])

    widget.send(key.with(key.a, mod.mod))
    expect(widget.state.value).toEqual(KEYS)
    expect(grid.rangeOf(widget.state, 'e')).toBeUndefined()
  })

  it('extends a range with Shift and the arrows from its start in any direction and shrinks it back', () => {
    const widget = simulateGrid({ selection: 'range', defaultActive: 'e' })

    widget.send(key.space).send(key.with(key.arrowRight, mod.shift))
    expect(widget.state.value).toEqual(['e', 'f'])

    widget.send(key.with(key.arrowLeft, mod.shift))
    expect(widget.state.value).toEqual(['e'])

    widget.send(key.with(key.arrowUp, mod.shift))
    expect(widget.state.value).toEqual(['b', 'e'])

    widget.send(key.with(key.arrowDown, mod.shift)).send(key.with(key.arrowDown, mod.shift))
    expect(widget.state.value).toEqual(['e', 'h'])
  })

  it('picks a range by two clicks and moves an edge of it by a drag', () => {
    const widget = simulateGrid({ selection: 'range' })

    widget.pressAt('b').pressAt('e')
    expect(widget.state.value).toEqual(['b', 'e'])
    expect(KEYS.map((cell) => grid.rangeOf(widget.state, cell))).toEqual([undefined, 'start', 'between', 'between', 'end', undefined, undefined, undefined, undefined])

    widget.send(pointer.down, { key: 'e' }).send(pointer.dragOver, { key: 'h' })
    expect(widget.state.value).toEqual(['b', 'h'])
    expect(widget.actions).toEqual([act.focus('h', { preventScroll: true })])

    widget.send(pointer.release).send(pointer.press, { key: 'h' })
    expect(widget.state.value).toEqual(['b', 'h'])
  })

  it('selects the cells a drag passes over in multiple selection and keeps them after the release', () => {
    const widget = simulateGrid({ selection: 'multiple' })

    widget.send(pointer.down, { key: 'a' }).send(pointer.dragOver, { key: 'b' }).send(pointer.dragOver, { key: 'e' })
    expect(widget.state.value).toEqual(['a', 'b', 'c', 'd', 'e'])

    widget.send(pointer.release).send(pointer.press, { key: 'e' })
    expect(widget.state.value).toEqual(['a', 'b', 'c', 'd', 'e'])
  })

  it('swallows only the click in the same task as the release of a drag, so a later click without a press still selects', () => {
    const widget = simulateGrid({ selection: 'multiple' })

    widget.send(pointer.down, { key: 'a' }).send(pointer.dragOver, { key: 'b' }).send(pointer.release)
    expect(widget.actions).toEqual([act.timer(DRAGGED, 0)])

    widget.send(timer(DRAGGED)).send(pointer.press, { key: 'i' })
    expect(widget.state.value).toEqual(['a', 'b', 'i'])
  })
})

describe('Error handling', () => {
  it('drops a disabled cell from the value of a read-only grid and repairs it only once', () => {
    const onRepair = vi.fn()
    const widget = createWidget(grid, { ...grid.emptyOptions, entries: entriesOf(KEYS, ['b']), selection: 'multiple', readOnly: true, defaultValue: ['a', 'b'] } as GridOptions, { id: 'grid', onRepair })

    widget.dispatch(createInput(focus.enter))
    expect(widget.state.value).toEqual(['a'])
    expect(onRepair).toHaveBeenCalledOnce()
  })
})

describe('Edge Cases', () => {
  it('wraps along the rows when wrap is horizontal, along the columns when it is vertical and both ways with both', () => {
    const horizontal = simulateGrid({ defaultActive: 'c', wrap: 'horizontal' })

    horizontal.send(key.arrowRight)
    expect(horizontal.state.active).toBe('d')

    horizontal.send(key.arrowLeft)
    expect(horizontal.state.active).toBe('c')

    const vertical = simulateGrid({ defaultActive: 'g', wrap: 'vertical' })

    vertical.send(key.arrowDown)
    expect(vertical.state.active).toBe('b')

    vertical.send(key.arrowUp)
    expect(vertical.state.active).toBe('g')

    const both = simulateGrid({ defaultActive: 'g', wrap: 'both' })

    both.send(key.arrowDown)
    expect(both.state.active).toBe('b')

    both.send(key.arrowUp).send(key.arrowLeft)
    expect(both.state.active).toBe('f')

    both.send(key.arrowRight)
    expect(both.state.active).toBe('g')
  })

  it('reads ArrowLeft as the next cell in a right-to-left grid and keeps ArrowUp and ArrowDown', () => {
    const widget = simulate(grid, { ...grid.emptyOptions, entries: entriesOf(KEYS), defaultActive: 'c', wrap: 'horizontal' } as GridOptions, { orientation: 'grid', rtl: true })

    widget.send(key.arrowLeft)
    expect(widget.state.active).toBe('d')

    widget.send(key.arrowRight).send(key.arrowDown)
    expect(widget.state.active).toBe('f')
  })

  it('moves to the last cell of the row with End and to the ends of the column with PageUp and PageDown, over an excluded cell', () => {
    const widget = simulateGrid({ defaultActive: 'b', exclude: ['h'] })

    widget.send(key.pageDown)
    expect(widget.state.active).toBe('e')

    widget.send(key.pageUp)
    expect(widget.state.active).toBe('b')

    widget.send(key.end)
    expect(widget.state.active).toBe('c')
  })

  it('follows the cells excluded after the start and moves the tab stop off an excluded active cell', () => {
    expect(grid.tabStop(simulateGrid({ defaultActive: 'a', exclude: ['a'] }).state)).toBe('b')

    const widget = simulateGrid({ defaultActive: 'a' })
    const exclude = (keys: string[]) => widget.setOptions({ ...grid.emptyOptions, entries: widget.state.options.entries, defaultActive: 'a', exclude: keys } as GridOptions)

    exclude(['b']).send(key.arrowRight)
    expect(widget.state.active).toBe('c')

    exclude([]).send(key.arrowLeft)
    expect(widget.state.active).toBe('b')

    exclude(['b'])
    expect(grid.tabStop(widget.state)).toBe('a')
    expect(renderPart(grid.output.cell, widget.state, 'b').attrs.tabIndex).toBeUndefined()
  })

  it('follows the cells disabled after the start and keeps them focusable', () => {
    const widget = simulateGrid({ selection: 'single', defaultActive: 'a' })
    const disable = (keys: string[]) => widget.setOptions({ ...grid.emptyOptions, entries: widget.state.options.entries, selection: 'single', defaultActive: 'a', disabled: keys } as GridOptions)

    disable(['b']).send(key.arrowRight)
    expect(widget.state.active).toBe('b')
    expect(renderPart(grid.output.cell, widget.state, 'b').attrs['aria-disabled']).toBe(true)

    disable([])
    expect(renderPart(grid.output.cell, widget.state, 'b').attrs['aria-disabled']).toBe(false)
  })

  it('drops a selected cell from the value once it is disabled, without reporting it, in strict mode too', () => {
    const onChangeValue = vi.fn()
    const widget = simulateGrid({ selection: 'multiple', defaultValue: ['b', 'c'], onChangeValue })

    widget.setOptions({ ...grid.emptyOptions, entries: widget.state.options.entries, selection: 'multiple', defaultValue: ['b', 'c'], disabled: ['b'], onChangeValue } as GridOptions)

    expect(widget.state.value).toEqual(['c'])
    expect(onChangeValue).not.toHaveBeenCalled()
  })

  it('leaves the disabled cells out of a range resolveRange gives, with Shift + arrows and with Mod+A', () => {
    const resolveRange = (start: string, end: string) => KEYS.slice(KEYS.indexOf(start), KEYS.indexOf(end) + 1)
    const widget = simulateGrid({ selection: 'multiple', disabled: ['b'], defaultActive: 'a', resolveRange })

    widget.send(key.space).send(key.with(key.arrowRight, mod.shift)).send(key.with(key.arrowRight, mod.shift))
    expect(widget.state.value).toEqual(['a', 'c'])

    widget.send(key.with(key.a, mod.mod))
    expect(widget.state.value).not.toContain('b')
  })

  it('never selects without a selection mode and leaves the cells without aria-selected', () => {
    const widget = simulateGrid().pressAt('b').send(key.enter, { key: 'b' }).send(key.space)

    expect(widget.state.value).toBe(null)
    expect(renderPart(grid.output.cell, widget.state, 'b').attrs['aria-selected']).toBeUndefined()
  })

  it('moves onto a disabled cell but never selects it, whether the cell or the grid disables it, and disables the cells outside min and max', () => {
    const widget = simulateGrid({ entries: entriesOf(KEYS, ['b']), disabled: ['e'], selection: 'single', min: 'b', max: 'h' })

    widget.send(key.arrowRight)
    expect(widget.state.active).toBe('b')

    widget.send(key.space).pressAt('a').pressAt('i').pressAt('e')
    expect(widget.state.value).toBe(null)
    expect(grid.isDisabled(widget.state, 'e')).toBe(true)
    expect(grid.isDisabled(widget.state, 'a')).toBe(true)
    expect(grid.isDisabled(widget.state, 'i')).toBe(true)

    widget.pressAt('h')
    expect(widget.state.value).toBe('h')
  })

  it('moves but never changes the selection when read-only, and marks the grid read-only', () => {
    const onChangeValue = vi.fn()
    const widget = simulateGrid({ selection: 'multiple', defaultValue: ['a'], readOnly: true, onChangeValue })

    widget.pressAt('b').send(key.arrowRight).send(key.space).send(key.with(key.a, mod.mod)).send(key.with(key.arrowDown, mod.shift))
    expect(widget.state.active).toBe('f')
    expect(widget.state.value).toEqual(['a'])
    expect(onChangeValue).not.toHaveBeenCalled()
    expect(grid.output.root.render(grid.output.root.select(widget.state, undefined as never))).toMatchObject({ 'aria-readonly': true })
  })

  it('makes a cell the browser focuses the active one', () => {
    const widget = simulateGrid({ defaultActive: 'a' })

    widget.send(focus.enter, { key: 'h' })
    expect(widget.state.active).toBe('h')
  })

  it('leaves the disabled cells out of Mod+A', () => {
    const widget = simulateGrid({ entries: entriesOf(KEYS, ['b', 'f']), selection: 'multiple' })

    widget.send(key.with(key.a, mod.mod))
    expect(widget.state.value).toEqual(['a', 'c', 'd', 'e', 'g', 'h', 'i'])
  })

  it('keeps the active cell among the shown cells and moves it to the first of them otherwise', () => {
    const widget = simulateGrid({ defaultActive: 'e' })

    widget.send(createInput(ACTIVATE_WITHIN, { keys: ['d', 'e', 'f'] }))
    expect(widget.state.active).toBe('e')

    widget.send(createInput(ACTIVATE_WITHIN, { keys: ['g', 'h', 'i'] }))
    expect(widget.state.active).toBe('g')
  })

  it('steps over an excluded cell and never makes it active on a press', () => {
    const widget = simulateGrid({ defaultActive: 'a', exclude: (cell) => cell === 'b' })

    widget.pressAt('b')
    expect(widget.state.active).toBe('a')

    widget.send(key.arrowRight)
    expect(widget.state.active).toBe('c')
  })

  it('starts a new Shift + arrow extension from the value the parent wrote meanwhile instead of continuing the old one', () => {
    const onChangeValue = vi.fn()
    const widget = simulateGrid({ selection: 'multiple', value: [], defaultActive: 'a', onChangeValue })

    widget.send(key.space).setOptions({ ...grid.emptyOptions, entries: widget.state.options.entries, selection: 'multiple', value: ['a'], onChangeValue } as GridOptions)
    widget.send(key.with(key.arrowRight, mod.shift)).setOptions({ ...grid.emptyOptions, entries: widget.state.options.entries, selection: 'multiple', value: ['a', 'b'], onChangeValue } as GridOptions)
    expect(widget.state.value).toEqual(['a', 'b'])

    widget.setOptions({ ...grid.emptyOptions, entries: widget.state.options.entries, selection: 'multiple', value: ['g', 'h'], onChangeValue } as GridOptions)
    widget.send(key.with(key.arrowRight, mod.shift))
    expect(onChangeValue).toHaveBeenLastCalledWith(['g', 'h', 'b', 'c'])
  })

  it('keeps the cells selected before a Shift + arrow and leaves the disabled cells out of it', () => {
    const widget = simulateGrid({ entries: entriesOf(KEYS, ['b']), selection: 'multiple', defaultValue: ['f'], defaultActive: 'a' })

    widget.send(key.with(key.arrowRight, mod.shift))
    expect(widget.state.value).toEqual(['f', 'a'])

    widget.send(key.with(key.arrowRight, mod.shift))
    expect(widget.state.value).toEqual(['f', 'a', 'c'])
  })

  it('orders the cells by row and column, not by the order of the entries or the keys as text', () => {
    const rows = (numbers: readonly number[]): GridEntry<string>[] =>
      numbers.map((row) => ({ key: `${row}:0`, data: { row, col: 0, excluded: false, disabled: false, selectable: true } }))

    const range = simulateGrid({ entries: rows(Array.from({ length: 11 }, (_, row) => row)), selection: 'range', defaultValue: ['9:0', '10:0'] })
    expect(grid.isSelected(range.state, '10:0')).toBe(true)
    expect(grid.isSelected(range.state, '5:0')).toBe(false)

    const shuffled = simulateGrid({ entries: rows([0, 2, 1]), selection: 'multiple' })
    shuffled.pressAt('0:0').send(key.with(key.arrowDown, mod.shift))
    expect(shuffled.state.value).toEqual(['0:0', '1:0'])
  })

  it('takes the keys of Shift + arrows and Mod+A past the given cells from resolveRange', () => {
    const positionOf = (cell: string) => cell.split(':').map(Number)
    const toIndex = (cell: string) => positionOf(cell)[0] * 2 + positionOf(cell)[1]
    const fromIndex = (index: number) => `${Math.floor(index / 2)}:${index % 2}`
    const resolveRange = (start: string, end: string) => Array.from({ length: toIndex(end) - toIndex(start) + 1 }, (_, index) => fromIndex(toIndex(start) + index))
    const getNextKey = (intent: string, from: string, next: string | undefined) => {
      const [row, col] = positionOf(from)
      if (intent === 'down') return row < 9 ? `${row + 1}:${col}` : undefined
      if (intent === 'gridStart') return '0:0'
      if (intent === 'gridEnd') return '9:1'

      return next
    }
    const entries = ['4:0', '4:1', '5:0', '5:1'].map((cell): GridEntry<string> => {
      const [row, col] = positionOf(cell)
      return { key: cell, data: { row, col, excluded: false, disabled: false, selectable: true } }
    })
    const onChangeValue = vi.fn()
    const widget = simulateGrid({ entries, selection: 'multiple', defaultActive: '5:0', compare: (first, second) => toIndex(first) - toIndex(second), resolveRange, getNextKey, onChangeValue })

    widget.send(key.with(key.arrowDown, mod.shift))
    expect(onChangeValue).toHaveBeenLastCalledWith(['5:0', '5:1', '6:0'])

    widget.send(key.with(key.a, mod.mod))
    expect(onChangeValue).toHaveBeenLastCalledWith(resolveRange('0:0', '9:1'))
  })

  it('takes the next cell from getNextKey', () => {
    const getNextKey = vi.fn((_intent: string, _from: string, next: string | undefined) => (next === 'b' ? 'i' : next))
    const widget = simulateGrid({ defaultActive: 'a', getNextKey })

    widget.send(key.arrowRight)
    expect(getNextKey).toHaveBeenLastCalledWith('forward', 'a', 'b')
    expect(widget.state.active).toBe('i')
  })

  it('keeps a value the parent controls', () => {
    const onChangeValue = vi.fn()
    const widget = simulateGrid({ selection: 'single', value: 'a', onChangeValue })

    widget.pressAt('e')
    expect(onChangeValue).toHaveBeenLastCalledWith('e')
    expect(widget.state.value).toBe('e')

    widget.setOptions({ ...grid.emptyOptions, entries: widget.state.options.entries, selection: 'single', value: 'a', onChangeValue } as GridOptions)
    expect(widget.state.value).toBe('a')
  })

  it('moves the focus into the content of a cell with Enter or F2, between its controls with Tab and back to the cell with Escape', () => {
    const widget = simulateGrid()

    widget.send(key.enter, { key: 'e', content: true })
    expect(widget.actions).toEqual([act.focusInside('e', 'first')])

    widget.send(key.f2, { key: 'e', content: true })
    expect(widget.actions).toEqual([act.focusInside('e', 'first')])

    widget.send(key.tab, { key: 'e', inside: true })
    expect(widget.actions).toEqual([act.focusInside('e', 'next')])

    widget.send(key.with(key.tab, mod.shift), { key: 'e', inside: true })
    expect(widget.actions).toEqual([act.focusInside('e', 'previous')])

    widget.send(key.escape, { key: 'e', inside: true })
    expect(widget.actions).toEqual([act.focus('e')])
  })

  it('focuses the tab stop on the focus command and the given cell when it names one', () => {
    const widget = simulateGrid({ defaultActive: 'e' })

    widget.send(createInput(FOCUS))
    expect(widget.actions).toEqual([act.focus('e')])

    widget.send(createInput(FOCUS, { key: 'g' }))
    expect(widget.state.active).toBe('g')
    expect(widget.actions).toEqual([act.focus('g')])
  })
})
