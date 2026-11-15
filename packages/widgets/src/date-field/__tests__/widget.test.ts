import { describe, expect, it, vi } from 'vitest'
import { act, createInput, focus, key, lifecycle, ROOT, text } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { createCalendarSystem, gregorianCalendar } from '@vega-ui/i18n'
import { PICK_VALUE } from '../../mask'
import { dateFieldWidget } from '../widget'

type DateFieldOptions = Parameters<typeof simulate<typeof dateFieldWidget.shape>>[1]

const options = (overrides: Partial<DateFieldOptions> = {}): DateFieldOptions => ({ format: 'dd.MM.yyyy', separator: '.', calendar: gregorianCalendar, today: '2026-01-15', min: undefined, max: undefined, disabledDates: undefined, ...overrides })

const simulateDate = (overrides: Partial<DateFieldOptions> = {}) => simulate(dateFieldWidget, options(overrides), { orientation: 'horizontal' })

type Simulation = ReturnType<typeof simulateDate>

const paste = (dateField: Simulation, data: string) => dateField.send(text.edit, { field: { value: '', selection: [0, 0] }, edit: { type: 'insertFromPaste', data } })

const pick = (date: string) => createInput(PICK_VALUE, { to: date })

const invalidityOf = (state: Simulation['state']) => {
  const { props } = dateFieldWidget.output.root
  if (!props) return undefined

  return props.render(props.select(state, undefined as never)).invalidAs
}

describe('Critical User Paths', () => {
  it('reads the typed text in the format and reports the day once it is complete', () => {
    const onChangeValue = vi.fn()
    const dateField = simulateDate({ onChangeValue })

    paste(dateField, '1503')
    expect(dateField.state.text).toBe('15.03')
    expect(dateField.state.value).toBe('')

    paste(dateField, '15032026')
    expect(dateField.state.text).toBe('15.03.2026')
    expect(onChangeValue).toHaveBeenLastCalledWith('2026-03-15')

    dateField.send(text.edit, { field: { value: '15.03.2026', selection: [10, 10] }, edit: { type: 'deleteContentBackward', data: '' } })
    expect(onChangeValue).toHaveBeenLastCalledWith('')
  })

  it('writes a picked day as committed text, so leaving the field reports no second change', () => {
    const onChangeValue = vi.fn()
    const dateField = simulateDate({ onChangeValue })

    dateField.send(focus.enter).send(pick('2026-03-15'))
    expect(dateField.answer).toBe('handled')
    expect(dateField.actions).toEqual([act.commitText(ROOT, '15.03.2026')])
    expect(onChangeValue).toHaveBeenLastCalledWith('2026-03-15')

    dateField.send(focus.leave)
    expect(dateField.actions).toEqual([])
  })

  it('takes the order and the separator of the format', () => {
    const dateField = simulateDate({ format: 'MM/dd/yyyy', separator: '/' })

    paste(dateField, '03152026')
    expect(dateField.state.text).toBe('03/15/2026')
    expect(dateField.state.value).toBe('2026-03-15')
  })
})

describe('Error handling', () => {
  it('makes an incomplete date invalid and a complete or an empty one valid', () => {
    const dateField = paste(simulateDate(), '1501')
    expect(invalidityOf(dateField.state)).toEqual({ pattern: '\\d', value: '-' })

    paste(dateField, '15012026')
    expect(invalidityOf(dateField.state)).toBeUndefined()

    dateField.send(text.edit, { field: { value: '15.01.2026', selection: [0, 10] }, edit: { type: 'deleteContentBackward', data: '' } })
    expect(dateField.state.text).toBe('')
    expect(invalidityOf(dateField.state)).toBeUndefined()
  })

  it('keeps a date outside min and max, typed, set or made so by a new bound, and makes the field invalid without reporting a change', () => {
    const typed = paste(simulateDate({ min: '2026-01-10', max: '2026-01-20' }), '05012026')
    expect(typed.state.text).toBe('05.01.2026')
    expect(invalidityOf(typed.state)).toEqual({ type: 'date', min: '2026-01-10', value: '2026-01-05' })

    expect(invalidityOf(simulateDate({ value: '2026-01-25', max: '2026-01-20' }).send(lifecycle.connect).state)).toEqual({ type: 'date', max: '2026-01-20', value: '2026-01-25' })
    expect(invalidityOf(simulateDate({ value: '2026-01-15', min: '2026-01-10', max: '2026-01-20' }).send(lifecycle.connect).state)).toBeUndefined()

    const onChangeValue = vi.fn()
    const dateField = paste(simulateDate({ onChangeValue }), '05012026')
    onChangeValue.mockClear()
    dateField.setOptions(options({ min: '2026-01-10', onChangeValue }))
    expect(dateField.actions).toEqual([])
    expect(onChangeValue).not.toHaveBeenCalled()
    expect(invalidityOf(dateField.state)).toEqual({ type: 'date', min: '2026-01-10', value: '2026-01-05' })
  })

  it('makes an unavailable date invalid', () => {
    expect(invalidityOf(paste(simulateDate({ disabledDates: ['2026-01-15'] }), '15012026').state)).toEqual({ pattern: '\\d', value: '-' })
  })
})

describe('Edge Cases', () => {
  it('deletes only the segment before the caret with the word deletion, like a native date input', () => {
    const dateField = simulateDate({ defaultValue: '2024-03-12' }).send(lifecycle.connect)

    dateField.send(text.edit, { field: { value: '12.03.2024', selection: [10, 10] }, edit: { type: 'deleteWordBackward', data: '' } })
    expect(dateField.state.text).toBe('12.03.')
  })

  it('shows the day in the calendar system and keeps the value an ISO day', () => {
    const dateField = simulateDate({ calendar: createCalendarSystem('persian') })

    paste(dateField, '01011405')
    expect(dateField.state.value).toBe('2026-03-21')

    dateField.send(pick('2026-03-22'))
    expect(dateField.state.text).toBe('02.01.1405')
  })

  it('reads a day that exists only in its calendar system, like the 31st of a Persian month or the 13th month of a Hebrew leap year', () => {
    const persian = paste(simulateDate({ calendar: createCalendarSystem('persian') }), '31061404')
    expect(persian.state.text).toBe('31.06.1404')
    expect(persian.state.value).toBe('2025-09-22')

    expect(paste(simulateDate({ calendar: createCalendarSystem('hebrew') }), '01135784').state.text).toBe('01.13.5784')
  })

  it('pads a day digit that cannot start a two-digit day', () => {
    expect(simulateDate().send(text.edit, { field: { value: '', selection: [0, 0] }, edit: { type: 'insertText', data: '4' } }).state.text).toBe('04')
  })

  it('reads a two-digit year within 80 years before and 19 years after the year of today', () => {
    expect(paste(simulateDate({ format: 'dd.MM.yy' }), '010145').state.value).toBe('2045-01-01')
    expect(paste(simulateDate({ format: 'dd.MM.yy' }), '010146').state.value).toBe('1946-01-01')
    expect(paste(simulateDate({ format: 'dd.MM.yy', today: '2036-01-15' }), '010146').state.value).toBe('2046-01-01')
    expect(paste(simulateDate({ format: 'dd.MM.yy', today: '2085-01-15' }), '290200').state.text).toBe('28.02.00')
  })

  it('keeps the day within its month', () => {
    expect(paste(simulateDate(), '31022026').state.text).toBe('28.02.2026')
  })

  it('writes the day again when the separator or the calendar changes', () => {
    const dateField = paste(simulateDate(), '15032026')

    dateField.setOptions(options({ separator: '/' }))
    expect(dateField.actions).toEqual([act.setText(ROOT, '15/03/2026')])

    dateField.setOptions(options({ separator: '/', calendar: createCalendarSystem('persian') }))
    expect(dateField.state.text).toBe('24/12/1404')
    expect(dateField.state.value).toBe('2026-03-15')
  })

  it('ignores a picked day in a read-only field and leaves the arrows to the browser', () => {
    const dateField = simulateDate({ defaultValue: '2026-03-15' }).send(lifecycle.connect).observe({ readOnly: true })

    dateField.send(pick('2026-04-01'))
    expect(dateField.answer).toBe('pass')
    expect(dateField.state.value).toBe('2026-03-15')

    dateField.send(key.arrowUp, { field: { value: '15.03.2026', selection: [0, 0] } })
    expect(dateField.answer).toBe('pass')
  })

  it('commits a picked day the parent controls once the parent takes it', () => {
    const onChangeValue = vi.fn()
    const dateField = simulateDate({ value: '', onChangeValue })

    dateField.send(pick('2026-03-15'))
    expect(onChangeValue).toHaveBeenLastCalledWith('2026-03-15')
    expect(dateField.actions).toEqual([act.setText(ROOT, '')])

    dateField.setOptions(options({ value: '2026-03-15', onChangeValue }))
    expect(dateField.actions).toEqual([act.commitText(ROOT, '15.03.2026')])

    dateField.send(focus.enter).send(focus.leave)
    expect(dateField.actions).toEqual([])
  })

  it('forgets a picked day the parent turned down once the focus leaves, so the same day set later is not an edit of the user', () => {
    const dateField = simulateDate({ value: '' })

    dateField.send(focus.enter).send(pick('2026-03-15')).setOptions(options({ value: '' }))
    dateField.send(focus.leave).setOptions(options({ value: '2026-03-15' }))

    expect(dateField.actions).toEqual([act.setText(ROOT, '15.03.2026')])
    expect(dateField.state.touched).toBe(false)
  })
})
