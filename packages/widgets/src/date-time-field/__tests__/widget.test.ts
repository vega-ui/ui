import { describe, expect, it, vi } from 'vitest'
import { act, createInput, key, lifecycle, ROOT, text } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { createCalendarSystem, gregorianCalendar } from '@vega-ui/i18n'
import { dateTimeFieldWidget, PICK_VALUE, timeOf } from '../widget'
import { getDateTimeWheelOptions, getDateTimeWheelValue, pickDateTimeWheel } from '../wheels'

type DateTimeFieldOptions = Parameters<typeof simulate<typeof dateTimeFieldWidget.shape>>[1]

const options = (overrides: Partial<DateTimeFieldOptions> = {}): DateTimeFieldOptions => ({
  dateFormat: 'dd.MM.yyyy',
  dateSeparator: '.',
  separator: ', ',
  timeFormat: 'HH:mm',
  timeStep: 1,
  calendar: gregorianCalendar,
  today: '2026-01-15',
  min: undefined,
  max: undefined,
  disabledDates: undefined,
  ...overrides,
})

const simulateDateTime = (overrides: Partial<DateTimeFieldOptions> = {}) => simulate(dateTimeFieldWidget, options(overrides), { orientation: 'horizontal' }).send(lifecycle.connect)

const at = (value: string, caret: number) => ({ field: { value, selection: [caret, caret] as const } })

const pick = (date: string) => createInput(PICK_VALUE, { to: date })

const invalidityOf = (state: ReturnType<typeof simulateDateTime>['state']) => {
  const { props } = dateTimeFieldWidget.output.root
  if (!props) return undefined

  return props.render(props.select(state, undefined as never)).invalidAs
}

describe('Critical User Paths', () => {
  it('reads the date and the time in their formats and reports the local date and time', () => {
    const onChangeValue = vi.fn()
    const dateTimeField = simulateDateTime({ onChangeValue })

    dateTimeField.send(text.edit, { ...at('', 0), edit: { type: 'insertFromPaste', data: '150320260905' } })
    expect(dateTimeField.state.text).toBe('15.03.2026, 09:05')
    expect(onChangeValue).toHaveBeenLastCalledWith('2026-03-15T09:05')

    dateTimeField.send(text.edit, { ...at(dateTimeField.state.text, 17), edit: { type: 'deleteContentBackward', data: '' } })
    expect(onChangeValue).toHaveBeenLastCalledWith('')
  })

  it('steps the time segment under the caret with the arrows and leaves the date segments to the browser', () => {
    const dateTimeField = simulateDateTime({ defaultValue: '2026-03-15T09:05' })

    dateTimeField.send(key.arrowUp, at(dateTimeField.state.text, 13))
    expect(dateTimeField.state.value).toBe('2026-03-15T10:05')
    expect(dateTimeField.actions).toEqual([act.setText(ROOT, '15.03.2026, 10:05', [13, 13])])

    dateTimeField.send(key.arrowDown, at(dateTimeField.state.text, 16))
    expect(dateTimeField.state.value).toBe('2026-03-15T10:04')

    dateTimeField.send(key.arrowUp, at(dateTimeField.state.text, 1))
    expect(dateTimeField.answer).toBe('pass')
  })

  it('writes a picked day with the time the field already has, or midnight', () => {
    const dateTimeField = simulateDateTime({ defaultValue: '2026-03-15T09:05' })

    dateTimeField.send(pick('2026-04-01'))
    expect(dateTimeField.state.value).toBe('2026-04-01T09:05')
    expect(dateTimeField.actions).toEqual([act.commitText(ROOT, '01.04.2026, 09:05')])

    expect(simulateDateTime().send(pick('2026-04-01')).state.value).toBe('2026-04-01T00:00')
  })

  it('gives the time of the value for a time button, empty while the value is', () => {
    const dateTimeField = simulateDateTime({ defaultValue: '2026-03-15T09:05' })

    expect(timeOf(dateTimeField.state)).toBe('09:05')
    expect(timeOf(simulateDateTime().state)).toBe('')
  })

  it('writes a picked date and time as they are, as the time wheels pick them', () => {
    const dateTimeField = simulateDateTime({ defaultValue: '2026-03-15T09:05' })

    dateTimeField.send(pick('2026-03-15T10:05'))

    expect(dateTimeField.state.value).toBe('2026-03-15T10:05')
    expect(dateTimeField.actions).toEqual([act.commitText(ROOT, '15.03.2026, 10:05')])
  })
})

describe('Error handling', () => {
  it('keeps a value before min, set or made so by a new bound, and makes the field invalid without reporting a change', () => {
    expect(invalidityOf(simulateDateTime({ value: '2026-01-15T08:00', min: '2026-01-15T09:00' }).state)).toEqual({ type: 'datetime-local', min: '2026-01-15T09:00', value: '2026-01-15T08:00' })

    const onChangeValue = vi.fn()
    const dateTimeField = simulateDateTime({ onChangeValue }).send(text.edit, { ...at('', 0), edit: { type: 'insertFromPaste', data: '050120261230' } })
    expect(invalidityOf(dateTimeField.state)).toBeUndefined()

    onChangeValue.mockClear()
    dateTimeField.setOptions(options({ min: '2026-01-10T09:00', onChangeValue }))
    expect(dateTimeField.state.text).toBe('05.01.2026, 12:30')
    expect(dateTimeField.actions).toEqual([])
    expect(onChangeValue).not.toHaveBeenCalled()
    expect(invalidityOf(dateTimeField.state)).toEqual({ type: 'datetime-local', min: '2026-01-10T09:00', value: '2026-01-05T12:30' })
  })
})

describe('Edge Cases', () => {
  it('stops the arrows at min and max', () => {
    const dateTimeField = simulateDateTime({ defaultValue: '2026-03-15T09:30', min: '2026-03-15T09:00', max: '2026-03-15T10:00' })

    dateTimeField.send(key.arrowDown, at(dateTimeField.state.text, 13))
    expect(dateTimeField.state.value).toBe('2026-03-15T09:00')
    expect(dateTimeField.actions).toEqual([act.setText(ROOT, '15.03.2026, 09:00', [13, 13])])

    dateTimeField.send(key.arrowUp, at(dateTimeField.state.text, 13)).send(key.arrowUp, at('15.03.2026, 10:00', 16))
    expect(dateTimeField.state.value).toBe('2026-03-15T10:00')
  })

  it('steps the minutes by the time step and the hours by one', () => {
    const dateTimeField = simulateDateTime({ defaultValue: '2026-03-15T09:00', timeStep: 15 })

    dateTimeField.send(key.arrowUp, at(dateTimeField.state.text, 16))
    expect(dateTimeField.state.value).toBe('2026-03-15T09:15')

    dateTimeField.send(key.arrowUp, at(dateTimeField.state.text, 13))
    expect(dateTimeField.state.value).toBe('2026-03-15T10:15')
  })

  it('wraps a stepped time segment around its range and keeps the day', () => {
    const dateTimeField = simulateDateTime({ defaultValue: '2026-03-15T00:30' })

    dateTimeField.send(key.arrowDown, at(dateTimeField.state.text, 13))
    expect(dateTimeField.state.value).toBe('2026-03-15T23:30')
  })

  it('keeps the hours within their range', () => {
    const dateTimeField = simulateDateTime().send(text.edit, { ...at('', 0), edit: { type: 'insertFromPaste', data: '150120262530' } })

    expect(dateTimeField.state.text).toBe('15.01.2026, 23:30')
  })

  it('leaves the arrows to the browser without a time step', () => {
    const dateTimeField = simulateDateTime({ defaultValue: '2026-03-15T09:05', timeStep: 0 })

    dateTimeField.send(key.arrowUp, at(dateTimeField.state.text, 13))
    expect(dateTimeField.answer).toBe('pass')
  })

  it('keeps the seconds of a format with seconds', () => {
    const dateTimeField = simulateDateTime({ defaultValue: '2026-03-15T09:05:30', timeFormat: 'HH:mm:ss' })

    expect(dateTimeField.state.text).toBe('15.03.2026, 09:05:30')

    dateTimeField.send(key.arrowUp, at(dateTimeField.state.text, 19))
    expect(dateTimeField.state.value).toBe('2026-03-15T09:05:31')
  })

  it('shows the date in the calendar system and keeps the value an ISO date and time', () => {
    const dateTimeField = simulateDateTime({ calendar: createCalendarSystem('persian') })

    dateTimeField.send(text.edit, { ...at('', 0), edit: { type: 'insertFromPaste', data: '010114051230' } })
    expect(dateTimeField.state.value).toBe('2026-03-21T12:30')

    dateTimeField.send(pick('2026-03-22'))
    expect(dateTimeField.state.text).toBe('02.01.1405, 12:30')
  })

  it('keeps the day within its month in the year of a two-digit year', () => {
    const dateTimeField = simulateDateTime({ dateFormat: 'dd.MM.yy', today: '2085-01-15' })

    dateTimeField.send(text.edit, { ...at('', 0), edit: { type: 'insertFromPaste', data: '290200' } })
    expect(dateTimeField.state.text).toBe('28.02.00')
  })

  it('writes the text again when a separator changes', () => {
    const dateTimeField = simulateDateTime({ defaultValue: '2026-03-15T09:05' })

    dateTimeField.setOptions(options({ defaultValue: '2026-03-15T09:05', separator: ' ' }))
    expect(dateTimeField.actions).toEqual([act.setText(ROOT, '15.03.2026 09:05')])

    dateTimeField.setOptions(options({ defaultValue: '2026-03-15T09:05', separator: ' ', dateSeparator: '/' }))
    expect(dateTimeField.state.text).toBe('15/03/2026 09:05')
  })

  it('turns the time of the date on the wheels, today within min and max for an empty field', () => {
    const wheel = { min: '2026-03-10T09:30', max: '2026-03-20T18:00', today: '2026-01-15', step: 15, seconds: false }

    expect(getDateTimeWheelValue('hour', '2026-03-15T12:45', wheel)).toBe('12')
    expect(pickDateTimeWheel('hour', '14', '2026-03-15T12:45', wheel)).toBe('2026-03-15T14:45')
    expect(getDateTimeWheelValue('hour', '', wheel)).toBe('09')
    expect(pickDateTimeWheel('minute', '45', '', wheel)).toBe('2026-03-10T09:45')
    expect(pickDateTimeWheel('minute', '45', '', { ...wheel, min: undefined, max: undefined })).toBe('2026-01-15T00:45')
  })

  it('disables the times outside min and max only on the days of min and max', () => {
    const wheel = { min: '2026-03-10T09:30', max: '2026-03-20T18:00', today: '2026-03-15', step: 15, seconds: false }
    const disabledHours = (value: string) => getDateTimeWheelOptions('hour', value, wheel).filter((option) => option.disabled).map((option) => option.value)

    expect(disabledHours('2026-03-10T12:00')).toEqual(['00', '01', '02', '03', '04', '05', '06', '07', '08'])
    expect(disabledHours('2026-03-15T12:00')).toEqual([])
    expect(disabledHours('2026-03-20T12:00')).toEqual(['19', '20', '21', '22', '23'])
    expect(pickDateTimeWheel('hour', '20', '2026-03-20T12:00', wheel)).toBe('2026-03-20T18:00')
  })
})
