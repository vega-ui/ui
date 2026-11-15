import { describe, expect, it, vi } from 'vitest'
import { act, createInput, lifecycle, ROOT, text } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { createCalendarSystem, gregorianCalendar } from '@vega-ui/i18n'
import { dateRangeFieldWidget, PICK_VALUE } from '../widget'

type DateRangeFieldOptions = Parameters<typeof simulate<typeof dateRangeFieldWidget.shape>>[1]

const options = (overrides: Partial<DateRangeFieldOptions> = {}): DateRangeFieldOptions => ({
  format: 'dd.MM.yyyy',
  separator: '.',
  rangeSeparator: ' – ',
  calendar: gregorianCalendar,
  today: '2026-01-15',
  min: undefined,
  max: undefined,
  disabledDates: undefined,
  ...overrides,
})

const simulateRange = (overrides: Partial<DateRangeFieldOptions> = {}) => simulate(dateRangeFieldWidget, options(overrides), { orientation: 'horizontal' })

type Simulation = ReturnType<typeof simulateRange>

const paste = (rangeField: Simulation, data: string) => rangeField.send(text.edit, { field: { value: '', selection: [0, 0] }, edit: { type: 'insertFromPaste', data } })

const typeAtEnd = (rangeField: Simulation, data: string) => rangeField.send(text.edit, { field: { value: rangeField.state.text, selection: [rangeField.state.text.length, rangeField.state.text.length] }, edit: { type: 'insertText', data } })

const invalidityOf = (state: Simulation['state']) => {
  const { props } = dateRangeFieldWidget.output.root
  if (!props) return undefined

  return props.render(props.select(state, undefined as never)).invalidAs
}

describe('Critical User Paths', () => {
  it('reports the start once it is complete and the end once the range is complete, without repeating an unchanged range', () => {
    const onChangeValue = vi.fn()
    const rangeField = simulateRange({ onChangeValue })

    paste(rangeField, '0102')
    expect(rangeField.state.value).toEqual(['', ''])
    expect(onChangeValue).not.toHaveBeenCalled()

    paste(rangeField, '01022026')
    expect(rangeField.state.value).toEqual(['2026-02-01', ''])

    typeAtEnd(rangeField, '0')
    expect(rangeField.state.text).toBe('01.02.2026 – 0')
    expect(onChangeValue).toHaveBeenCalledTimes(1)

    paste(rangeField, '0102202605022026')
    expect(rangeField.state.text).toBe('01.02.2026 – 05.02.2026')
    expect(onChangeValue).toHaveBeenLastCalledWith(['2026-02-01', '2026-02-05'])
  })

  it('swaps a range typed backwards', () => {
    const rangeField = paste(simulateRange(), '1502202601022026')

    expect(rangeField.state.text).toBe('01.02.2026 – 15.02.2026')
    expect(rangeField.state.value).toEqual(['2026-02-01', '2026-02-15'])
  })

  it('writes a picked range as committed text', () => {
    const rangeField = simulateRange()

    rangeField.send(createInput(PICK_VALUE, { to: ['2026-02-01', '2026-02-05'] }))
    expect(rangeField.state.value).toEqual(['2026-02-01', '2026-02-05'])
    expect(rangeField.actions).toEqual([act.commitText(ROOT, '01.02.2026 – 05.02.2026')])
  })
})

describe('Error handling', () => {
  it('keeps a range with a date outside min and max, set or made so by new bounds, and makes the field invalid without reporting a change', () => {
    expect(invalidityOf(simulateRange({ value: ['2026-01-10', '2026-01-25'], max: '2026-01-20' }).send(lifecycle.connect).state)).toEqual({ type: 'date', max: '2026-01-20', value: '2026-01-25' })

    const onChangeValue = vi.fn()
    const rangeField = paste(simulateRange({ onChangeValue }), '0501202625012026')
    expect(invalidityOf(rangeField.state)).toBeUndefined()

    onChangeValue.mockClear()
    rangeField.setOptions(options({ min: '2026-01-10', max: '2026-01-20', onChangeValue }))
    expect(rangeField.state.text).toBe('05.01.2026 – 25.01.2026')
    expect(rangeField.actions).toEqual([])
    expect(onChangeValue).not.toHaveBeenCalled()
    expect(invalidityOf(rangeField.state)).toEqual({ type: 'date', min: '2026-01-10', value: '2026-01-05' })
  })

  it('makes a range with an unavailable end invalid', () => {
    expect(invalidityOf(paste(simulateRange({ disabledDates: ['2026-01-15'] }), '1001202615012026').state)).toEqual({ pattern: '\\d', value: '-' })
  })
})

describe('Edge Cases', () => {
  it('writes the range again when the range separator changes', () => {
    const rangeField = simulateRange({ defaultValue: ['2026-02-01', '2026-02-05'] }).send(lifecycle.connect)

    rangeField.setOptions(options({ defaultValue: ['2026-02-01', '2026-02-05'], rangeSeparator: ' - ' }))
    expect(rangeField.actions).toEqual([act.setText(ROOT, '01.02.2026 - 05.02.2026')])
  })

  it('shows the range in the calendar system and keeps the value ISO days', () => {
    const rangeField = simulateRange({ calendar: createCalendarSystem('persian') })

    paste(rangeField, '0101140502011405')
    expect(rangeField.state.value).toEqual(['2026-03-21', '2026-03-22'])

    rangeField.send(createInput(PICK_VALUE, { to: ['2026-03-21', '2026-03-23'] }))
    expect(rangeField.state.text).toBe('01.01.1405 – 03.01.1405')
  })

  it('keeps each day within its month in the year of a two-digit year', () => {
    const rangeField = paste(simulateRange({ format: 'dd.MM.yy', today: '2085-01-15' }), '290200290204')

    expect(rangeField.state.text).toBe('28.02.00 – 29.02.04')
  })

  it('keeps the end day within its month', () => {
    expect(paste(simulateRange(), '0102202631022026').state.text).toBe('01.02.2026 – 28.02.2026')
  })

  it('keeps a range the parent controls until the parent takes the new one', () => {
    const onChangeValue = vi.fn()
    const rangeField = simulateRange({ value: ['2026-02-01', '2026-02-05'], onChangeValue }).send(lifecycle.connect)

    rangeField.send(createInput(PICK_VALUE, { to: ['2026-02-02', '2026-02-06'] }))
    expect(onChangeValue).toHaveBeenLastCalledWith(['2026-02-02', '2026-02-06'])
    expect(rangeField.actions).toEqual([act.setText(ROOT, '01.02.2026 – 05.02.2026')])

    rangeField.setOptions(options({ value: ['2026-02-02', '2026-02-06'], onChangeValue }))
    expect(rangeField.actions).toEqual([act.commitText(ROOT, '02.02.2026 – 06.02.2026')])
  })
})
