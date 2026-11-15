import { describe, expect, it, vi } from 'vitest'
import { act, browser, focus, key, lifecycle, ROOT, text } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { timeFieldWidget } from '../widget'

type TimeFieldOptions = Parameters<typeof simulate<typeof timeFieldWidget.shape>>[1]

const options = (overrides: Partial<TimeFieldOptions> = {}): TimeFieldOptions => ({ format: 'HH:mm', min: undefined, max: undefined, step: 1, ...overrides })

const simulateTime = (overrides: Partial<TimeFieldOptions> = {}) => simulate(timeFieldWidget, options(overrides), { orientation: 'horizontal' })

type Simulation = ReturnType<typeof simulateTime>

const at = (value: string, caret = value.length) => ({ field: { value, selection: [caret, caret] as const } })

const typeInto = (timeField: Simulation, chars: string) => {
  for (const data of chars) timeField.send(text.edit, { ...at(timeField.state.text), edit: { type: 'insertText', data } })

  return timeField
}

const rootOf = (state: Simulation['state']) => timeFieldWidget.output.root.render(timeFieldWidget.output.root.select(state, undefined as never))

const invalidityOf = (state: Simulation['state']) => {
  const { props } = timeFieldWidget.output.root
  if (!props) return undefined

  return props.render(props.select(state, undefined as never)).invalidAs
}

describe('Critical User Paths', () => {
  it('masks the typed digits and reports the time once it is complete', () => {
    const onChangeValue = vi.fn()
    const timeField = simulateTime({ onChangeValue })

    typeInto(timeField, '123')
    expect(timeField.state.text).toBe('12:3')
    expect(timeField.state.value).toBe('')
    expect(timeField.actions).toEqual([act.setText(ROOT, '12:3', [4, 4])])
    expect(onChangeValue).not.toHaveBeenCalled()

    typeInto(timeField, '0')
    expect(timeField.state.value).toBe('12:30')
    expect(onChangeValue).toHaveBeenLastCalledWith('12:30')

    timeField.send(text.edit, { ...at('12:30'), edit: { type: 'deleteContentBackward', data: '' } })
    expect(timeField.state.text).toBe('12:3')
    expect(onChangeValue).toHaveBeenLastCalledWith('')
  })

  it('reads and reports the seconds of a format with seconds', () => {
    const onChangeValue = vi.fn()

    expect(typeInto(simulateTime({ format: 'HH:mm:ss', onChangeValue }), '093015').state.text).toBe('09:30:15')
    expect(onChangeValue).toHaveBeenLastCalledWith('09:30:15')
  })

  it('completes a segment with a zero when the separator follows a single digit, typed, pasted or filled in', () => {
    expect(typeInto(simulateTime(), '1:30').state.value).toBe('01:30')

    const pasted = simulateTime().send(text.edit, { ...at(''), edit: { type: 'insertFromPaste', data: '7:45' } })
    expect(pasted.state.value).toBe('07:45')

    const filled = simulateTime().send(text.change, at('9:05'))
    expect(filled.state.value).toBe('09:05')
    expect(filled.actions).toEqual([act.setText(ROOT, '09:05', [5, 5])])
  })

  it('steps the segment under the caret with the arrows and keeps the caret', () => {
    const timeField = simulateTime({ defaultValue: '12:30' }).send(lifecycle.connect)

    timeField.send(key.arrowUp, at('12:30', 1))
    expect(timeField.state.value).toBe('13:30')
    expect(timeField.actions).toEqual([act.setText(ROOT, '13:30', [1, 1])])

    timeField.send(key.arrowDown, at('13:30', 4))
    expect(timeField.state.value).toBe('13:29')
  })

  it('commits the text and marks it edited when the focus leaves after a change', () => {
    const timeField = simulateTime()

    timeField.send(focus.enter).send(focus.leave)
    expect(timeField.actions).toEqual([])
    expect(rootOf(timeField.state)).toEqual({ 'data-user-edited': undefined })

    timeField.send(focus.enter)
    typeInto(timeField, '1').send(focus.leave)
    expect(timeField.actions).toEqual([act.commit(ROOT)])
    expect(rootOf(timeField.state)).toEqual({ 'data-user-edited': true })
  })

  it('restores the default time on a form reset', () => {
    const timeField = simulateTime({ defaultValue: '09:05' }).send(lifecycle.connect)

    timeField.send(focus.enter).send(text.edit, { ...at('09:05', 0), edit: { type: 'insertText', data: '1' } }).send(focus.leave)
    expect(timeField.state.value).toBe('19:05')

    timeField.send(browser.reset)
    expect(timeField.state.value).toBe('09:05')
    expect(timeField.actions).toEqual([act.setText(ROOT, '09:05')])
    expect(rootOf(timeField.state)).toEqual({ 'data-user-edited': undefined })
  })
})

describe('Edge Cases', () => {
  it('writes the formatted time into the field once connected and again when the format changes, without reporting a change', () => {
    const onChangeValue = vi.fn()
    const timeField = simulateTime({ defaultValue: '09:05', onChangeValue })

    timeField.send(lifecycle.connect)
    expect(timeField.actions).toEqual([act.setText(ROOT, '09:05')])

    timeField.setOptions(options({ defaultValue: '09:05', format: 'HH:mm:ss', onChangeValue }))
    expect(timeField.state.text).toBe('09:05:00')
    expect(timeField.actions).toEqual([act.setText(ROOT, '09:05:00')])
    expect(onChangeValue).not.toHaveBeenCalled()
  })

  it('keeps a character the mask rejects out of the field and reads digits of other scripts', () => {
    const timeField = simulateTime()

    typeInto(timeField, 'a')
    expect(timeField.answer).toBe('handled')
    expect(timeField.actions).toEqual([])

    typeInto(timeField, '١٢٣٠')
    expect(timeField.state.value).toBe('12:30')

    timeField.send(text.change, at('٠٩:٠٥'))
    expect(timeField.state.value).toBe('09:05')
  })

  it('pads a digit that cannot start the hours and keeps each segment within its range', () => {
    expect(typeInto(simulateTime(), '4').state.text).toBe('04')
    expect(typeInto(simulateTime(), '2530').state.text).toBe('23:30')
  })

  it('steps the minutes under the caret by the step and the hours by one', () => {
    const timeField = simulateTime({ defaultValue: '09:00', step: 15 }).send(lifecycle.connect)

    timeField.send(key.arrowUp, at('09:00'))
    expect(timeField.state.value).toBe('09:15')

    timeField.send(key.arrowUp, at('09:15', 1))
    expect(timeField.state.value).toBe('10:15')
  })

  it('keeps a time outside min and max, typed or made so by a new bound, and makes the field invalid without reporting a change', () => {
    const onChangeValue = vi.fn()
    const early = typeInto(simulateTime({ min: '09:00', max: '18:30' }), '0800')
    expect(early.state.text).toBe('08:00')
    expect(invalidityOf(early.state)).toEqual({ type: 'time', min: '09:00', value: '08:00' })

    const late = typeInto(simulateTime({ min: '09:00', max: '18:30' }), '1900')
    expect(late.state.text).toBe('19:00')
    expect(invalidityOf(late.state)).toEqual({ type: 'time', max: '18:30', value: '19:00' })

    const timeField = typeInto(simulateTime({ onChangeValue }), '0800')
    expect(invalidityOf(timeField.state)).toBeUndefined()

    onChangeValue.mockClear()
    timeField.setOptions(options({ min: '09:00', onChangeValue }))
    expect(timeField.actions).toEqual([])
    expect(onChangeValue).not.toHaveBeenCalled()
    expect(invalidityOf(timeField.state)).toEqual({ type: 'time', min: '09:00', value: '08:00' })
  })

  it('ignores a min that is not a time', () => {
    expect(invalidityOf(typeInto(simulateTime({ min: '9 am' }), '0800').state)).toBeUndefined()
  })

  it('leaves a text the browser changed as it is when it already fits, and commits no change of its own for it', () => {
    const timeField = simulateTime()

    timeField.send(text.change, at('09:05'))
    expect(timeField.state.value).toBe('09:05')
    expect(timeField.actions).toEqual([])

    timeField.send(focus.enter).send(focus.leave)
    expect(timeField.actions).toEqual([])
  })

  it('keeps a partly typed time when the format changes', () => {
    const timeField = typeInto(simulateTime(), '123')

    timeField.setOptions(options({ format: 'HH:mm:ss' }))
    expect(timeField.state.text).toBe('12:3')
  })

  it('stops the arrows at min and max, and leaves them to the browser without a step or in a read-only field', () => {
    const timeField = simulateTime({ defaultValue: '09:00', min: '09:00', max: '17:00' }).send(lifecycle.connect)

    timeField.send(key.arrowDown, at('09:00', 1))
    expect(timeField.state.value).toBe('09:00')

    timeField.send(key.arrowUp, at('16:30', 1))
    expect(timeField.state.value).toBe('17:00')

    const still = simulateTime({ defaultValue: '09:00', step: 0 }).send(key.arrowUp, at('09:00', 1))
    expect(still.answer).toBe('pass')

    const readOnly = simulateTime({ defaultValue: '09:00' }).observe({ readOnly: true }).send(key.arrowUp, at('09:00', 1))
    expect(readOnly.answer).toBe('pass')
    expect(readOnly.state.value).toBe('09:00')
  })

  it('shows a time the parent controls only once the parent takes it, and keeps the text it rejects out', () => {
    const onChangeValue = vi.fn()
    const timeField = simulateTime({ value: '09:00', onChangeValue }).send(lifecycle.connect)

    timeField.send(text.edit, { ...at('09:00', 1), edit: { type: 'insertText', data: '8' } })
    expect(onChangeValue).toHaveBeenLastCalledWith('08:00')
    expect(timeField.actions).toEqual([act.setText(ROOT, '09:00')])

    timeField.setOptions(options({ value: '08:00', onChangeValue }))
    expect(timeField.state.text).toBe('08:00')
    expect(timeField.actions).toEqual([act.setText(ROOT, '08:00', [3, 3])])

    timeField.send(text.edit, { ...at('08:00', 1), edit: { type: 'insertText', data: '7' } })
    timeField.setOptions(options({ value: '08:00', onChangeValue }))
    expect(timeField.state.text).toBe('08:00')
  })

  it('takes a time the parent sets and keeps the text the user is typing when it means the same time', () => {
    const timeField = simulateTime({ value: '' }).send(lifecycle.connect)

    timeField.setOptions(options({ value: '10:15' }))
    expect(timeField.actions).toEqual([act.setText(ROOT, '10:15')])

    timeField.send(text.edit, { ...at('10:15'), edit: { type: 'deleteContentBackward', data: '' } })
    timeField.setOptions(options({ value: '' }))
    expect(timeField.state.text).toBe('10:1')
  })
})
