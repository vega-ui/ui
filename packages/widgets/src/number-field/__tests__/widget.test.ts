import { describe, expect, it, vi } from 'vitest'
import { act, browser, createInput, focus, key, lifecycle, pointer, ROOT, text } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { DECREMENT, INCREMENT, isMaxOf, isMinOf, numberFieldWidget } from '../widget'

type NumberFieldOptions = Parameters<typeof simulate<typeof numberFieldWidget.shape>>[1]

const options = (overrides: Partial<NumberFieldOptions> = {}): NumberFieldOptions => ({
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  step: 1,
  maximumFractionDigits: 2,
  allowEmpty: true,
  changeOnWheel: true,
  ...overrides,
})

const simulateNumber = (overrides: Partial<NumberFieldOptions> = {}) => simulate(numberFieldWidget, options(overrides), { orientation: 'horizontal' })

type Simulation = ReturnType<typeof simulateNumber>

const typeInto = (numberField: Simulation, chars: string) => {
  for (const data of chars) numberField.send(text.edit, { field: { value: numberField.state.text, selection: [numberField.state.text.length, numberField.state.text.length] }, edit: { type: 'insertText', data } })

  return numberField
}

const wheel = (y: number) => ({ delta: { x: 0, y } })

const rootOf = (state: Simulation['state']) => numberFieldWidget.output.root.render(numberFieldWidget.output.root.select(state, undefined as never))

describe('Critical User Paths', () => {
  it('groups the typed digits, keeps the fraction digits it allows and reports the number', () => {
    const onChangeValue = vi.fn()
    const numberField = typeInto(simulateNumber({ onChangeValue }), '1234.567')

    expect(numberField.state.text).toBe('1\u00a0234.56')
    expect(onChangeValue).toHaveBeenLastCalledWith(1234.56)
  })

  it('steps the number with the arrows and the buttons, committing the text, and stops at min and max', () => {
    const numberField = typeInto(simulateNumber({ min: 0, max: 10, step: 4 }), '5')

    numberField.send(key.arrowUp)
    expect(numberField.state.value).toBe(9)
    expect(numberField.actions).toEqual([act.commitText(ROOT, '9')])

    numberField.send(createInput(INCREMENT))
    expect(numberField.state.value).toBe(10)
    expect(isMaxOf(numberField.state)).toBe(true)

    numberField.send(key.arrowDown).send(createInput(DECREMENT)).send(createInput(DECREMENT))
    expect(numberField.state.value).toBe(0)
    expect(isMinOf(numberField.state)).toBe(true)
  })

  it('starts stepping an empty field at min, or at zero without one, or at max below zero', () => {
    expect(simulateNumber().send(key.arrowUp).state.value).toBe(0)
    expect(simulateNumber({ min: 5 }).send(key.arrowDown).state.value).toBe(5)
    expect(simulateNumber({ max: -5 }).send(key.arrowUp).state.value).toBe(-5)
  })

  it('changes the number on the wheel only while the field has the focus', () => {
    const numberField = typeInto(simulateNumber(), '5')

    numberField.send(pointer.spin, wheel(-10))
    expect(numberField.answer).toBe('pass')

    numberField.observe({ focused: true }).send(pointer.spin, wheel(-10))
    expect(numberField.state.value).toBe(6)

    numberField.send(pointer.spin, wheel(10))
    expect(numberField.state.value).toBe(5)

    expect(simulateNumber({ changeOnWheel: false }).observe({ focused: true }).send(pointer.spin, wheel(-10)).answer).toBe('pass')
  })

  it('steps ten steps with PageUp and PageDown and jumps to min and max with Home and End', () => {
    const paged = simulateNumber({ defaultValue: 5, step: 2 }).send(lifecycle.connect)

    paged.send(key.pageUp)
    expect(paged.state.value).toBe(25)

    paged.send(key.pageDown)
    expect(paged.state.value).toBe(5)

    const bounded = simulateNumber({ defaultValue: 5, min: 1, max: 9 }).send(lifecycle.connect)

    bounded.send(key.home)
    expect(bounded.state.value).toBe(1)

    bounded.send(key.end)
    expect(bounded.state.value).toBe(9)
  })

  it('restores the default number on a form reset', () => {
    const numberField = simulateNumber({ defaultValue: 3 }).send(lifecycle.connect)

    numberField.send(createInput(INCREMENT))
    expect(numberField.state.text).toBe('4')

    numberField.send(browser.reset)
    expect(numberField.state.text).toBe('3')
    expect(numberField.actions).toEqual([act.setText(ROOT, '3')])
  })

  it('tidies the number when the focus leaves: leading zeros and a missing integer part', () => {
    const leading = typeInto(simulateNumber(), '007').send(focus.leave)
    expect(leading.state.text).toBe('7')
    expect(leading.actions).toEqual([act.setText(ROOT, '7', [1, 1]), act.commit(ROOT)])

    expect(typeInto(simulateNumber(), '.5').send(focus.leave).state.text).toBe('0.5')
  })
})

describe('Edge Cases', () => {
  it('keeps the number within min and max while typing and drops a minus without negative numbers', () => {
    expect(typeInto(simulateNumber({ max: 100 }), '500').state.value).toBe(100)
    expect(typeInto(simulateNumber({ min: 0 }), '-12').state.value).toBe(12)
    expect(typeInto(simulateNumber(), '-12').state.value).toBe(-12)
  })

  it('stops a step at a min above zero and a max below zero, which typing leaves to the user', () => {
    expect(typeInto(simulateNumber({ min: 5, step: 4 }), '6').send(key.arrowDown).state.value).toBe(5)
    expect(typeInto(simulateNumber({ max: -5, step: 4 }), '-6').send(key.arrowUp).state.value).toBe(-5)
  })

  it('raises a typed number below min to min when the focus leaves', () => {
    const onChangeValue = vi.fn()
    const numberField = typeInto(simulateNumber({ min: 5, onChangeValue }), '3').send(focus.leave)

    expect(numberField.state.text).toBe('5')
    expect(onChangeValue).toHaveBeenLastCalledWith(5)
  })

  it('fills an empty field with min, or zero, or max below zero, when it leaves and the field does not allow empty', () => {
    const numberField = simulateNumber({ allowEmpty: false, min: 5 })

    numberField.send(focus.enter).send(focus.leave)
    expect(numberField.state.value).toBe(5)

    expect(simulateNumber({ allowEmpty: false }).send(focus.leave).state.text).toBe('0')
    expect(simulateNumber({ allowEmpty: false, max: -5 }).send(focus.leave).state.text).toBe('-5')
    expect(simulateNumber().send(focus.leave).state.text).toBe('')
  })

  it('adds a fractional step without floating point noise or a trailing zero', () => {
    const numberField = typeInto(simulateNumber({ step: 0.1 }), '0.2')

    numberField.send(createInput(INCREMENT))
    expect(numberField.state.text).toBe('0.3')

    expect(typeInto(simulateNumber({ step: 0.1 }), '0.9').send(key.arrowUp).state.text).toBe('1')
    expect(typeInto(simulateNumber({ step: 0.1 }), '1.1').send(key.arrowDown).state.text).toBe('1')
  })

  it('leaves the arrows, the buttons and the wheel alone in a read-only field', () => {
    const numberField = simulateNumber({ defaultValue: 5 }).send(lifecycle.connect).observe({ readOnly: true, focused: true })

    numberField.send(key.arrowUp).send(createInput(INCREMENT)).send(pointer.spin, wheel(-10))
    expect(numberField.answer).toBe('pass')
    expect(numberField.state.value).toBe(5)
  })

  it('reads a comma as the decimal point and digits of other scripts', () => {
    expect(typeInto(simulateNumber(), '1,5').state.value).toBe(1.5)
    expect(typeInto(simulateNumber(), '١٢').state.value).toBe(12)
  })

  it('leaves Home and End to the browser without min and max', () => {
    const numberField = simulateNumber({ defaultValue: 55 }).send(lifecycle.connect)

    expect(numberField.send(key.home).answer).toBe('pass')
    expect(numberField.send(key.end).answer).toBe('pass')
  })

  it('shows a number the parent controls only once the parent takes it', () => {
    const onChangeValue = vi.fn()
    const numberField = simulateNumber({ value: 5, onChangeValue }).send(lifecycle.connect)

    typeInto(numberField, '7')
    expect(onChangeValue).toHaveBeenLastCalledWith(57)
    expect(numberField.actions).toEqual([act.setText(ROOT, '5')])
  })

  it('forgets a number the parent turned down once the focus leaves, so a later parent value is written as the parent formats it', () => {
    const numberField = simulateNumber({ value: 1 }).send(lifecycle.connect).send(focus.enter)

    numberField.send(text.edit, { field: { value: '1', selection: [1, 1] }, edit: { type: 'insertFromPaste', data: '.50' } })
    numberField.send(focus.leave).setOptions(options({ value: 1.5 }))
    expect(numberField.actions).toEqual([act.setText(ROOT, '1.5')])
  })

  it('announces only the bounds that were set', () => {
    expect(rootOf(simulateNumber({ min: 1, max: 9 }).state)).toMatchObject({ 'aria-valuemin': 1, 'aria-valuemax': 9 })
    expect(rootOf(simulateNumber().state)).toMatchObject({ 'aria-valuemin': undefined, 'aria-valuemax': undefined })
  })

  it('formats the default number once connected', () => {
    const numberField = simulateNumber({ defaultValue: 1234.5 })

    numberField.send(lifecycle.connect)
    expect(numberField.actions).toEqual([act.setText(ROOT, '1\u00a0234.5')])
  })
})
