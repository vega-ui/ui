import { describe, expect, it, vi } from 'vitest'
import { act, browser, createInput, focus, key, lifecycle, ROOT, text } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { pinFieldWidget, SELECT_SLOT, slotGlyphOf, slotPart } from '../widget'

type PinFieldOptions = Parameters<typeof simulate<typeof pinFieldWidget.shape>>[1]

const options = (overrides: Partial<PinFieldOptions> = {}): PinFieldOptions => ({ maxLength: 4, mask: undefined, disabled: false, ...overrides })

const simulatePin = (overrides: Partial<PinFieldOptions> = {}) => simulate(pinFieldWidget, options(overrides), { orientation: 'horizontal' })

const field = (value: string, selection: readonly [number, number] = [value.length, value.length]) => ({ field: { value, selection } })

const typed = (value: string, selection: readonly [number, number], data: string, type = 'insertText') => ({ ...field(value, selection), edit: { type, data } })

const rootOf = (state: Parameters<typeof pinFieldWidget.output.root.select>[0]) => pinFieldWidget.output.root.render(pinFieldWidget.output.root.select(state, undefined as never))

const slotsOf = (state: Parameters<typeof slotPart.select>[0]) => [0, 1, 2, 3].map((slot) => slotPart.render(slotPart.select(state, slot)))

describe('Critical User Paths', () => {
  it('writes a typed digit into the selected slot and selects the next one', () => {
    const onChangeValue = vi.fn()
    const pinField = simulatePin({ onChangeValue })

    pinField.send(text.edit, typed('', [0, 0], '1'))
    expect(pinField.state.value).toBe('1')
    expect(pinField.state.active).toBe(1)
    expect(pinField.answer).toBe('handled')
    expect(pinField.actions).toEqual([act.setText(ROOT, '1', [1, 2])])
    expect(onChangeValue).toHaveBeenLastCalledWith('1')

    pinField.send(text.edit, typed('12', [0, 1], '5'))
    expect(pinField.state.value).toBe('52')
    expect(pinField.actions).toEqual([act.setText(ROOT, '52', [1, 2])])
  })

  it('cuts a pasted code to the free slots and selects the last slot', () => {
    const pinField = simulatePin()

    pinField.send(text.edit, typed('', [0, 0], '123456', 'insertFromPaste'))
    expect(pinField.state.value).toBe('1234')
    expect(pinField.actions).toEqual([act.setText(ROOT, '1234', [3, 4])])
  })

  it('deletes the digit of the selected slot with Backspace', () => {
    const pinField = simulatePin({ defaultValue: '123' })

    pinField.send(text.edit, typed('123', [1, 2], '', 'deleteContentBackward'))
    expect(pinField.state.value).toBe('13')
    expect(pinField.actions).toEqual([act.setText(ROOT, '13', [1, 2])])
  })

  it('moves between the slots with the arrows, Home and End, up to the slot after the last digit', () => {
    const pinField = simulatePin({ defaultValue: '123' })

    pinField.send(key.arrowLeft, field('123', [2, 3]))
    expect(pinField.actions).toEqual([act.setText(ROOT, '123', [1, 2])])

    pinField.send(key.arrowRight, field('123', [2, 3]))
    expect(pinField.actions).toEqual([act.setText(ROOT, '123', [3, 4])])

    pinField.send(key.home, field('123', [2, 3]))
    expect(pinField.state.active).toBe(0)

    pinField.send(key.end, field('123', [0, 1]))
    expect(pinField.state.active).toBe(3)

    pinField.send(key.arrowUp, field('123', [2, 3]))
    expect(pinField.state.active).toBe(0)

    pinField.send(key.arrowDown, field('123', [0, 1]))
    expect(pinField.state.active).toBe(3)
  })

  it('selects the first empty slot on focus, or the last slot of a full code', () => {
    const pinField = simulatePin({ defaultValue: '12' })

    pinField.send(focus.enter)
    expect(pinField.actions).toEqual([act.setText(ROOT, '12', [2, 3])])

    const full = simulatePin({ defaultValue: '1234' })
    full.send(focus.enter)
    expect(full.actions).toEqual([act.setText(ROOT, '1234', [3, 4])])
  })

  it('commits the code and marks it edited when the focus leaves after a change', () => {
    const pinField = simulatePin()

    pinField.send(focus.enter).send(focus.leave)
    expect(pinField.actions).toEqual([])
    expect(rootOf(pinField.state)).toEqual({ 'data-user-edited': undefined })

    pinField.send(focus.enter).send(text.edit, typed('', [0, 0], '7')).send(focus.leave)
    expect(pinField.state.active).toBe(-1)
    expect(pinField.actions).toEqual([act.commit(ROOT)])
    expect(rootOf(pinField.state)).toEqual({ 'data-user-edited': true })
  })

  it('focuses the field at a slot the user picks', () => {
    const pinField = simulatePin({ defaultValue: '123' })

    pinField.send(createInput(SELECT_SLOT, { to: 1 }))
    expect(pinField.state.active).toBe(1)
    expect(pinField.actions).toEqual([act.focusPart(ROOT), act.setText(ROOT, '123', [1, 2])])
  })

  it('restores the default code on a form reset', () => {
    const onChangeValue = vi.fn()
    const pinField = simulatePin({ defaultValue: '12', onChangeValue })

    pinField.send(focus.enter).send(text.edit, typed('12', [2, 2], '3')).send(focus.leave)
    pinField.send(browser.reset)

    expect(pinField.state.value).toBe('12')
    expect(onChangeValue).toHaveBeenLastCalledWith('12')
    expect(pinField.actions).toEqual([act.setText(ROOT, '12')])
    expect(rootOf(pinField.state)).toEqual({ 'data-user-edited': undefined })
  })
})

describe('Edge Cases', () => {
  it('keeps a character the mask rejects out of the field', () => {
    const pinField = simulatePin({ defaultValue: '1' })

    pinField.send(text.edit, typed('1', [1, 1], 'a'))
    expect(pinField.state.value).toBe('1')
    expect(pinField.answer).toBe('handled')
    expect(pinField.actions).toEqual([])
  })

  it('takes letters with a pattern that allows them', () => {
    const pinField = simulatePin({ mask: /^[A-Z]+$/ })

    pinField.send(text.edit, typed('', [0, 0], 'A')).send(text.edit, typed('A', [1, 1], '1'))
    expect(pinField.state.value).toBe('A')
  })

  it('formats the code with a mask of entries', () => {
    const pinField = simulatePin({ mask: [/\d/, /\d/, '-', /\d/, /\d/], maxLength: 5 })

    pinField.send(text.edit, typed('12', [2, 2], '3'))
    expect(pinField.state.value).toBe('12-3')
  })

  it('puts back the text the browser changed when it does not fit the mask', () => {
    const pinField = simulatePin({ defaultValue: '12' })

    pinField.send(text.change, field('12x'))
    expect(pinField.state.value).toBe('12')
    expect(pinField.actions).toEqual([act.setText(ROOT, '12')])

    pinField.send(text.change, field('125', [3, 3]))
    expect(pinField.state.value).toBe('125')
    expect(pinField.actions).toEqual([act.setText(ROOT, '125', [3, 4])])
  })

  it('shows the code the parent keeps and selects the next slot once the parent takes the new one', () => {
    const onChangeValue = vi.fn()
    const pinField = simulatePin({ value: '1', onChangeValue })

    pinField.send(text.edit, typed('1', [1, 1], '2'))
    expect(onChangeValue).toHaveBeenLastCalledWith('12')
    expect(pinField.actions).toEqual([act.setText(ROOT, '1')])

    pinField.setOptions(options({ value: '12', onChangeValue }))
    expect(pinField.state.active).toBe(2)
    expect(pinField.actions).toEqual([act.setText(ROOT, '12', [2, 3])])

    pinField.send(text.edit, typed('12', [2, 2], '3'))
    expect(pinField.actions).toEqual([act.setText(ROOT, '12')])

    pinField.setOptions(options({ value: '12', onChangeValue }))
    expect(pinField.state.value).toBe('12')
  })

  it('leaves the slots inactive when the parent later sets a code it rejected while the field had the focus', () => {
    const pinField = simulatePin({ value: '12' })

    pinField.send(focus.enter).send(text.edit, typed('12', [2, 2], '3')).send(focus.leave)
    pinField.setOptions(options({ value: '123' }))

    expect(pinField.state.active).toBe(-1)
    expect(pinField.actions).toEqual([act.setText(ROOT, '123')])
  })

  it('writes the code into the field once connected', () => {
    const pinField = simulatePin({ defaultValue: '42' })

    pinField.send(lifecycle.connect)
    expect(pinField.actions).toEqual([act.setText(ROOT, '42')])
  })

  it('ignores a picked slot while disabled', () => {
    const pinField = simulatePin({ disabled: true })

    pinField.send(createInput(SELECT_SLOT, { to: 1 }))
    expect(pinField.actions).toEqual([])
  })

  it('marks the slot of the caret, every slot of a selected code and the empty slots', () => {
    const pinField = simulatePin({ defaultValue: '12' })

    pinField.send(text.edit, typed('12', [2, 2], '3'))
    expect(slotsOf(pinField.state).map((slot) => [slot['data-caret'], slot['data-active'], slot['data-placeholder']])).toEqual([
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [true, true, true],
    ])

    pinField.send(text.select, field('123', [0, 3]))
    expect(slotsOf(pinField.state).map((slot) => slot['data-active'])).toEqual([true, true, true, true])
    expect(slotsOf(simulatePin({ disabled: true }).state)[0]).toMatchObject({ 'aria-hidden': 'true', 'data-disabled': true })
  })

  it('shows a bullet for each typed character while the field is a password', () => {
    const pinField = simulatePin({ defaultValue: '12' })

    expect([0, 1, 2].map((slot) => slotGlyphOf(pinField.state, slot))).toEqual(['1', '2', undefined])

    pinField.observe({ password: true })
    expect([0, 1, 2].map((slot) => slotGlyphOf(pinField.state, slot))).toEqual(['•', '•', undefined])
  })

  it('knows a selection of the whole code', () => {
    const pinField = simulatePin({ defaultValue: '12' })

    pinField.send(text.select, field('12', [0, 2]))
    expect(pinField.state.selectedAll).toBe(true)

    pinField.send(text.select, field('12', [1, 2]))
    expect(pinField.state.selectedAll).toBe(false)

    pinField.send(text.select, field('', [0, 0]))
    expect(pinField.state.selectedAll).toBe(false)
  })
})
