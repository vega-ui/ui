import { describe, expect, it, vi } from 'vitest'
import { key, lifecycle, mod, renderPart } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { createCalendarSystem, gregorianCalendar } from '@vega-ui/i18n'
import { GridEntry } from '../../grid'
import { dayRules, monthRules, yearRules } from '../rules'
import { createPeriodPicker, FOCUS_DATE, PeriodOptions, SHOW } from '../widget'

const entriesOf = (keys: readonly string[], firstCol: number, rowOffset: number): GridEntry<string>[] =>
  keys.map((date, index) => {
    const position = firstCol + index
    return { key: date, data: { row: rowOffset + Math.floor(position / 7), col: position % 7, excluded: false, disabled: false, selectable: true } }
  })

const daysOf = (month: string, count: number) => Array.from({ length: count }, (_, index) => `${month}-${String(index + 1).padStart(2, '0')}`)

const march = daysOf('2026-03', 31)
const april = daysOf('2026-04', 30)
const months = Array.from({ length: 12 }, (_, index) => `2026-${String(index + 1).padStart(2, '0')}-01`)
const years = Array.from({ length: 12 }, (_, index) => `${2020 + index}-01-01`)

const grid = (entries: readonly GridEntry<string>[], overrides: Partial<PeriodOptions> = {}): PeriodOptions => ({
  entries,
  cells: undefined,
  wrap: 'horizontal',
  exclude: undefined,
  disabled: undefined,
  readOnly: undefined,
  selection: 'single',
  min: undefined,
  max: undefined,
  compare: undefined,
  resolveRange: undefined,
  getNextKey: undefined,
  calendar: gregorianCalendar,
  weekStartsOn: 0,
  today: '2026-03-10',
  autoFocus: undefined,
  ...overrides,
})

const twoMonths = [...entriesOf(march, 0, 0), ...entriesOf(april, 3, 6)]

const days = (overrides: Partial<PeriodOptions> = {}) => simulate(createPeriodPicker(dayRules), grid(twoMonths, overrides), { orientation: 'grid' })

describe('Critical User Paths', () => {
  it('takes the focused day as the tab stop, otherwise the selected day, otherwise today', () => {
    const picker = createPeriodPicker(dayRules)

    expect(picker.tabStop(simulate(picker, grid(twoMonths), { orientation: 'grid' }).state)).toBe('2026-03-10')
    expect(picker.tabStop(simulate(picker, grid(twoMonths, { value: '2026-03-20' }), { orientation: 'grid' }).state)).toBe('2026-03-20')
    expect(picker.tabStop(simulate(picker, grid(twoMonths, { value: '2026-03-20', defaultFocusedDate: '2026-03-05' }), { orientation: 'grid' }).state)).toBe('2026-03-05')
  })

  it('moves the focused day with the arrows across the end of the month and reports it', () => {
    const onChangeFocusedDate = vi.fn()
    const widget = days({ defaultFocusedDate: '2026-03-31', onChangeFocusedDate })

    widget.send(key.arrowRight)
    expect(widget.state.focusedDate).toBe('2026-04-01')
    expect(widget.actions).toEqual([{ type: 'focus', key: '2026-04-01' }])
    expect(onChangeFocusedDate).toHaveBeenLastCalledWith('2026-04-01')

    widget.send(key.arrowDown)
    expect(widget.state.focusedDate).toBe('2026-04-08')

    widget.send(key.arrowUp)
    expect(widget.state.focusedDate).toBe('2026-04-01')
  })

  it('moves a month with PageUp and PageDown and a year with Shift', () => {
    const widget = days({ defaultFocusedDate: '2026-03-15' })

    widget.send(key.pageDown)
    expect(widget.state.focusedDate).toBe('2026-04-15')

    widget.send(key.with(key.pageDown, mod.shift))
    expect(widget.state.focusedDate).toBe('2027-04-15')
    expect(widget.actions).toEqual([{ type: 'focus', key: '2027-04-15' }])

    widget.send(key.with(key.pageUp, mod.shift)).send(key.pageUp)
    expect(widget.state.focusedDate).toBe('2026-03-15')
  })

  it('moves the focused year by a page with PageUp and PageDown and to the ends of the shown page with Mod+Home and Mod+End in a scroller, and to the end of the column without one', () => {
    const picker = createPeriodPicker(yearRules)
    const renderedYears = Array.from({ length: 36 }, (_, index) => `${2020 + index}-01-01`)
    const paged = simulate(picker, grid(entriesOf(renderedYears, 0, 0), { defaultFocusedDate: '2024-01-01', period: 12 }), { orientation: 'grid' })

    paged.send(lifecycle.connect).observe({ paged: true }).send(key.pageDown)
    expect(paged.state.focusedDate).toBe('2036-01-01')
    expect(paged.actions).toEqual([{ type: 'focus', key: '2036-01-01' }])

    paged.send(key.with(key.end, mod.mod))
    expect(paged.state.focusedDate).toBe('2047-01-01')

    paged.send(key.with(key.home, mod.mod))
    expect(paged.state.focusedDate).toBe('2036-01-01')

    paged.send(key.pageUp)
    expect(paged.state.focusedDate).toBe('2024-01-01')

    const flat = simulate(picker, grid(entriesOf(years, 0, 0), { defaultFocusedDate: '2024-01-01', period: 12 }), { orientation: 'grid' })
    flat.send(key.pageDown)
    expect(flat.state.focusedDate).toBe('2031-01-01')
  })

  it('shows another month at the same day and leaves the month that is already shown alone', () => {
    const widget = days({ defaultFocusedDate: '2026-03-15' })

    widget.send(SHOW, { key: '2026-04-01', keys: april })
    expect(widget.state.focusedDate).toBe('2026-04-15')
    expect(widget.actions).toEqual([])

    widget.send(SHOW, { key: '2026-04-20', keys: april })
    expect(widget.state.focusedDate).toBe('2026-04-15')
  })

  it('selects the tab stop with Space and reports the value', () => {
    const onChangeValue = vi.fn()
    const widget = days({ onChangeValue })

    widget.send(key.space)

    expect(widget.state.value).toBe('2026-03-10')
    expect(onChangeValue).toHaveBeenCalledExactlyOnceWith('2026-03-10')
  })

  it('reports a range picked backwards from its start to its end', () => {
    const onChangeValue = vi.fn()

    days({ selection: 'range', onChangeValue }).pressAt('2026-03-20').pressAt('2026-03-10')

    expect(onChangeValue).toHaveBeenLastCalledWith(['2026-03-10', '2026-03-20'])
  })

  it('moves to the ends of the week with Home and End and to the ends of the month with Mod', () => {
    const widget = days({ defaultFocusedDate: '2026-03-18' })

    widget.send(key.home)
    expect(widget.state.focusedDate).toBe('2026-03-15')

    widget.send(key.end)
    expect(widget.state.focusedDate).toBe('2026-03-21')

    widget.send(key.with(key.home, mod.mod))
    expect(widget.state.focusedDate).toBe('2026-03-01')

    widget.send(key.with(key.end, mod.mod))
    expect(widget.state.focusedDate).toBe('2026-03-31')
  })

  it('skips disabled days while navigating and never counts them as selected in a range', () => {
    const picker = createPeriodPicker(dayRules)
    const widget = simulate(picker, grid(twoMonths, { selection: 'range', disabled: ['2026-03-12'] }), { orientation: 'grid' })

    widget.send(key.space).send(key.with(key.arrowRight, mod.shift)).send(key.with(key.arrowRight, mod.shift))

    expect(widget.state.focusedDate).toBe('2026-03-13')
    expect(widget.state.value).toEqual(['2026-03-10', '2026-03-13'])
    expect(picker.isSelected(widget.state, '2026-03-11')).toBe(true)
    expect(picker.isSelected(widget.state, '2026-03-12')).toBe(false)
    expect(picker.rangeOf(widget.state, '2026-03-13')).toBe('end')
  })

  it('keeps a controlled focused day until the parent changes it', () => {
    const onChangeFocusedDate = vi.fn()
    const options = grid(twoMonths, { focusedDate: '2026-03-10', onChangeFocusedDate })
    const widget = simulate(createPeriodPicker(dayRules), options, { orientation: 'grid' })

    widget.send(key.arrowRight)
    expect(widget.state.focusedDate).toBe('2026-03-11')
    expect(onChangeFocusedDate).toHaveBeenCalledExactlyOnceWith('2026-03-11')

    widget.setOptions(options)
    expect(widget.state.focusedDate).toBe('2026-03-10')
  })
})

describe('Error handling', () => {
  it('ignores a focus request for a day that cannot be focused', () => {
    const widget = days({ defaultFocusedDate: '2026-03-10', disabled: ['2026-03-20'] })

    widget.send(FOCUS_DATE, { key: '2026-03-20' })

    expect(widget.state.focusedDate).toBe('2026-03-10')
    expect(widget.actions).toEqual([])
  })

  it('focuses the first day of a shown page when no day is focused yet', () => {
    const widget = days({ today: undefined })

    widget.send(SHOW, { key: '2026-04-01', keys: april })

    expect(widget.state.focusedDate).toBe('2026-04-01')
  })
})

describe('Edge Cases', () => {
  it('stops at max and treats the days before min and after max as excluded and disabled', () => {
    const picker = createPeriodPicker(dayRules)
    const widget = simulate(picker, grid(twoMonths, { defaultFocusedDate: '2026-03-15', min: '2026-03-05', max: '2026-03-15' }), { orientation: 'grid' })

    widget.send(key.arrowRight)

    expect(widget.state.focusedDate).toBe('2026-03-15')
    expect(widget.actions).toEqual([])
    expect(picker.isDisabled(widget.state, '2026-03-16')).toBe(true)
    expect(picker.isExcluded(widget.state, '2026-03-16')).toBe(true)
    expect(picker.isDisabled(widget.state, '2026-03-04')).toBe(true)
    expect(picker.isDisabled(widget.state, '2026-03-05')).toBe(false)
  })

  it('keeps the day within its month, min and max when paging by a month or a year, in any calendar system', () => {
    const onChangeValue = vi.fn()
    const monthEnd = days({ defaultFocusedDate: '2026-03-31', onChangeValue })
    monthEnd.send(key.pageDown)
    expect(monthEnd.state.focusedDate).toBe('2026-04-30')
    expect(onChangeValue).not.toHaveBeenCalled()

    const leapDay = days({ defaultFocusedDate: '2024-02-29' })
    leapDay.send(key.with(key.pageDown, mod.shift))
    expect(leapDay.state.focusedDate).toBe('2025-02-28')

    leapDay.send(key.with(key.pageUp, mod.shift)).send(key.with(key.pageUp, mod.shift))
    expect(leapDay.state.focusedDate).toBe('2023-02-28')

    expect(days({ defaultFocusedDate: '2026-03-15', max: '2026-04-10' }).send(key.with(key.pageDown, mod.shift)).state.focusedDate).toBe('2026-04-10')

    const persian = simulate(createPeriodPicker(dayRules), grid(entriesOf(daysOf('2025-04', 30), 2, 0), { calendar: createCalendarSystem('persian'), defaultFocusedDate: '2025-04-20' }), { orientation: 'grid' })
    persian.send(key.pageDown)
    expect(persian.state.focusedDate).toBe('2025-05-21')
  })

  it('puts the tab stop on the first available day of the focused month when neither the focused day nor today is available', () => {
    const picker = createPeriodPicker(dayRules)
    const tabStopOf = (overrides: Partial<PeriodOptions>) => picker.tabStop(simulate(picker, grid(twoMonths, overrides), { orientation: 'grid' }).state)

    expect(tabStopOf({ today: '2026-04-10', disabled: ['2026-04-10'] })).toBe('2026-04-01')
    expect(tabStopOf({ defaultFocusedDate: '2026-04-01', disabled: ['2026-04-01'], today: undefined })).toBe('2026-04-02')
  })

  it('puts the tab stop on the first available month or year when the focused one is before min', () => {
    const monthPicker = createPeriodPicker(monthRules)
    const monthsOf2026 = simulate(monthPicker, grid(entriesOf(months, 0, 0), { defaultFocusedDate: '2026-01-01', min: '2026-03-01', today: undefined }), { orientation: 'grid' })
    expect(monthPicker.tabStop(monthsOf2026.state)).toBe('2026-03-01')
    expect(monthPicker.isDisabled(monthsOf2026.state, '2026-02-01')).toBe(true)

    const yearPicker = createPeriodPicker(yearRules)
    const decade = simulate(yearPicker, grid(entriesOf(years, 0, 0), { defaultFocusedDate: '2020-06-01', min: '2023-01-01', today: '2040-01-01' }), { orientation: 'grid' })
    expect(yearPicker.tabStop(decade.state)).toBe('2023-01-01')
    expect(yearPicker.isDisabled(decade.state, '2022-01-01')).toBe(true)
  })

  it('focuses the tab stop when connected only with autoFocus', () => {
    expect(days({ autoFocus: true }).send(lifecycle.connect).actions).toEqual([{ type: 'focus', key: '2026-03-10' }])
    expect(days().send(lifecycle.connect).actions).toEqual([])
  })

  it('keeps the first focused day as the origin of the pages, also when today is known only after hydration', () => {
    const picker = createPeriodPicker(dayRules)
    const widget = simulate(picker, grid(twoMonths, { today: undefined }), { orientation: 'grid' })

    widget.send(lifecycle.connect)
    expect(picker.originOf(widget.state)).toBeUndefined()

    widget.setOptions(grid(twoMonths))
    widget.send(key.arrowDown).send(key.arrowDown).send(key.arrowDown)

    expect(widget.state.focusedDate).toBe('2026-03-31')
    expect(picker.originOf(widget.state)).toBe('2026-03-10')
  })

  it('takes the start of the focused month and year as the tab stop and resolves a focused year inside min and max', () => {
    const monthPicker = createPeriodPicker(monthRules)
    const monthsOf2026 = simulate(monthPicker, grid(entriesOf(months, 0, 0), { defaultFocusedDate: '2026-03-15' }), { orientation: 'grid' })
    expect(monthPicker.tabStop(monthsOf2026.state)).toBe('2026-03-01')

    const yearPicker = createPeriodPicker(yearRules)
    const decade = simulate(yearPicker, grid(entriesOf(years, 0, 0), { defaultFocusedDate: '2026-03-15', min: '2024-01-01' }), { orientation: 'grid' })
    expect(yearPicker.tabStop(decade.state)).toBe('2026-01-01')

    decade.send(FOCUS_DATE, { key: '2020-06-01' })
    expect(decade.state.focusedDate).toBe('2024-01-01')
    expect(decade.actions).toEqual([{ type: 'focus', key: '2024-01-01' }])
  })
})

describe('Accessibility', () => {
  it('gives the tab stop tabindex 0, the other days -1 and takes disabled days out of the tab order', () => {
    const picker = createPeriodPicker(dayRules)
    const widget = simulate(picker, grid(twoMonths, { value: '2026-03-20', disabled: ['2026-03-12'] }), { orientation: 'grid' })

    expect(renderPart(picker.output.cell, widget.state, '2026-03-20').attrs).toMatchObject({ role: 'gridcell', tabIndex: 0, 'aria-selected': true })
    expect(renderPart(picker.output.cell, widget.state, '2026-03-21').attrs).toMatchObject({ tabIndex: -1, 'aria-selected': false })
    expect(renderPart(picker.output.cell, widget.state, '2026-03-12').attrs).toMatchObject({ tabIndex: undefined, 'aria-disabled': true })
  })
})

describe('Performance', () => {
  it('keeps the collection and the tab stop when the options are set again unchanged', () => {
    const picker = createPeriodPicker(dayRules)
    const options = grid(twoMonths, { value: '2026-03-20' })
    const widget = simulate(picker, options, { orientation: 'grid' })
    const before = widget.state

    widget.setOptions({ ...options })

    expect(widget.state.collection).toBe(before.collection)
    expect(picker.tabStop(widget.state)).toBe(picker.tabStop(before))
  })
})
