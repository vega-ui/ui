import { describe, expect, it, vi } from 'vitest'
import { act, browser, createInput, lifecycle, ROOT, text } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { PhoneNumbering, phoneNumbering } from '@vega-ui/i18n'
import { phoneFieldWidget, SELECT_COUNTRY } from '../widget'

type PhoneFieldOptions = Parameters<typeof simulate<typeof phoneFieldWidget.shape>>[1]

const simulatePhone = (overrides: Partial<PhoneFieldOptions> = {}) => simulate(phoneFieldWidget, { strict: true, numbering: phoneNumbering, ...overrides } as PhoneFieldOptions, { orientation: 'horizontal' }).send(lifecycle.connect)

type Simulation = ReturnType<typeof simulatePhone>

const typeInto = (phoneField: Simulation, chars: string) => {
  for (const data of chars) phoneField.send(text.edit, { field: { value: phoneField.state.text, selection: [phoneField.state.text.length, phoneField.state.text.length] }, edit: { type: 'insertText', data } })

  return phoneField
}

const invalidityOf = (state: Simulation['state']) => {
  const { props } = phoneFieldWidget.output.root
  if (!props) return undefined

  return props.render(props.select(state, undefined as never)).invalidAs
}

describe('Critical User Paths', () => {
  it('starts a strict field with the calling code of the country and reports the number in E.164 as it is typed', () => {
    const onChangeValue = vi.fn()
    const phoneField = simulatePhone({ defaultCountry: 'US', onChangeValue })
    expect(phoneField.state.text).toBe('+1 ')

    typeInto(phoneField, '20155')
    expect(phoneField.state.text).toBe('+1 201 55')
    expect(onChangeValue).toHaveBeenLastCalledWith('+120155')

    typeInto(phoneField, '50123')
    expect(phoneField.state.text).toBe('+1 201 555-0123')
    expect(onChangeValue).toHaveBeenLastCalledWith('+12015550123')
  })

  it('takes the country of a typed calling code and reports it', () => {
    const onChangeCountry = vi.fn()
    const phoneField = simulatePhone({ onChangeCountry })

    typeInto(phoneField, '+442079460958')
    expect(phoneField.state.text).toBe('+44 20 7946-0958')
    expect(phoneField.state.value).toBe('+442079460958')
    expect(onChangeCountry).toHaveBeenLastCalledWith('GB')
  })

  it('writes the calling code of a picked country as committed text and focuses the field', () => {
    const onChangeCountry = vi.fn()
    const phoneField = simulatePhone({ defaultCountry: 'US', onChangeCountry })

    phoneField.send(createInput(SELECT_COUNTRY, { to: 'DE' }))
    expect(onChangeCountry).toHaveBeenLastCalledWith('DE')
    expect(phoneField.actions).toEqual([act.focusPart(ROOT), act.commitText(ROOT, '+49 ')])
  })

  it('formats the number with the numbering it is given', () => {
    const onChangeValue = vi.fn()
    const format = (shown: string) => phoneNumbering.format(shown).replace(/(?<=\d) (?=\d)/g, '').replace(/^(\+\d)(\d)/, '$1 $2')
    const numbering: PhoneNumbering = { ...phoneNumbering, format }
    const phoneField = typeInto(simulatePhone({ defaultCountry: 'RU', numbering, onChangeValue }), '9123456789')

    expect(phoneField.state.text).toBe('+7 9123456789')
    expect(onChangeValue).toHaveBeenLastCalledWith('+79123456789')
  })
})

describe('Error handling', () => {
  it('makes a number too short for its country invalid, and a full one or the calling code alone valid', () => {
    const phoneField = typeInto(simulatePhone({ strict: false }), '+7912')
    expect(invalidityOf(phoneField.state)).toEqual({ pattern: '\\d', value: '-' })

    typeInto(phoneField, '3456789')
    expect(invalidityOf(phoneField.state)).toBeUndefined()

    phoneField.send(createInput(SELECT_COUNTRY, { to: 'US' }))
    expect(phoneField.state.text.trim()).toBe('+1')
    expect(invalidityOf(phoneField.state)).toBeUndefined()
  })
})

describe('Edge Cases', () => {
  it('keeps the caret after the calling code of a strict field', () => {
    const phoneField = simulatePhone({ defaultCountry: 'US', defaultValue: '+12015550123' })

    phoneField.send(text.select, { field: { value: phoneField.state.text, selection: [0, 0] } })
    expect(phoneField.actions).toEqual([act.setText(ROOT, '+1 201 555-0123', [3, 3])])

    phoneField.send(text.select, { field: { value: phoneField.state.text, selection: [5, 5] } })
    expect(phoneField.answer).toBe('pass')
  })

  it('changes only the country when a country is picked in a read-only field', () => {
    const phoneField = simulatePhone({ defaultCountry: 'US', defaultValue: '+12015550123' }).observe({ readOnly: true })

    phoneField.send(createInput(SELECT_COUNTRY, { to: 'DE' }))
    expect(phoneField.state.country).toBe('DE')
    expect(phoneField.state.value).toBe('+12015550123')
    expect(phoneField.actions).toEqual([act.focusPart(ROOT)])
  })

  it('never changes the number when the parent changes the country, and keeps its calling code while typing on', () => {
    const onChangeValue = vi.fn()
    const phoneField = simulatePhone({ country: 'US', defaultValue: '+12015550123', onChangeValue })

    phoneField.setOptions({ strict: true, numbering: phoneNumbering, country: 'DE', defaultValue: '+12015550123', onChangeValue } as PhoneFieldOptions)
    expect(phoneField.state.value).toBe('+12015550123')
    expect(onChangeValue).not.toHaveBeenCalled()

    const typing = simulatePhone({ country: 'RU', defaultValue: '+7912', onChangeValue })
    typing.setOptions({ strict: true, numbering: phoneNumbering, country: 'FR', defaultValue: '+7912', onChangeValue } as PhoneFieldOptions)
    typing.send(text.edit, { field: { value: '+7 912', selection: [6, 6] }, edit: { type: 'insertText', data: '3' } })
    expect(typing.state.text).toBe('+7 912 3')
    expect(onChangeValue.mock.calls).toEqual([['+79123']])
  })

  it('writes the calling code of a picked country and reports an empty number, whether the parent controls the country or the number', () => {
    const onChangeValue = vi.fn()
    const onChangeCountry = vi.fn()
    const phoneField = simulatePhone({ defaultValue: '+7912', country: 'RU', onChangeValue, onChangeCountry })

    phoneField.send(createInput(SELECT_COUNTRY, { to: 'US' }))
    expect(phoneField.actions).toEqual([act.focusPart(ROOT), act.commitText(ROOT, '+1 ')])
    expect(onChangeValue.mock.calls).toEqual([['']])
    expect(onChangeCountry.mock.calls).toEqual([['US']])

    const kept = simulatePhone({ value: '', defaultCountry: 'RU' }).send(createInput(SELECT_COUNTRY, { to: 'FR' }))
    expect(kept.actions).toEqual([act.focusPart(ROOT), act.commitText(ROOT, '+33 ')])
  })

  it('reports a country detected in a typed number once while the parent keeps another one', () => {
    const onChangeCountry = vi.fn()
    typeInto(simulatePhone({ strict: false, country: 'IT', onChangeCountry }), '+12345678900')

    expect(onChangeCountry.mock.calls).toEqual([['US']])
  })

  it('cuts a number too long for its country, strict or loose', () => {
    expect(typeInto(simulatePhone({ defaultCountry: 'US' }), '20155501239999').state.text).toBe('+1 201 555-0123')
    expect(typeInto(simulatePhone({ defaultCountry: 'US', strict: false }), '+120155501239999').state.text).toBe('+1 201 555-0123')
  })

  it('shifts the digits after a deleted one', () => {
    const phoneField = simulatePhone({ defaultCountry: 'RU', defaultValue: '+79123456789' })

    phoneField.send(text.edit, { field: { value: phoneField.state.text, selection: [6, 6] }, edit: { type: 'deleteContentBackward', data: '' } })
    expect(phoneField.state.text).toBe('+7 913 456-78-9')
  })

  it('restores the default country and its calling code on a form reset', () => {
    const phoneField = simulatePhone({ defaultCountry: 'US' })

    phoneField.send(createInput(SELECT_COUNTRY, { to: 'DE' }))
    typeInto(phoneField, '301').send(browser.reset)
    expect(phoneField.state.country).toBe('US')
    expect(phoneField.state.value).toBe('')
    expect(phoneField.actions).toEqual([act.setText(ROOT, '+1 ')])
  })

  it('starts and resets at the country of a default number, which wins over defaultCountry', () => {
    const phoneField = simulatePhone({ defaultCountry: 'DE', defaultValue: '+12015550123' })
    expect(phoneField.state.country).toBe('US')

    phoneField.send(createInput(SELECT_COUNTRY, { to: 'FR' })).send(browser.reset)
    expect(phoneField.state.country).toBe('US')
  })

  it('deletes only the last group of digits with the word deletion, like a native field', () => {
    const phoneField = simulatePhone({ defaultValue: '+12015550123' })

    phoneField.send(text.edit, { field: { value: '+1 201 555-0123', selection: [15, 15] }, edit: { type: 'deleteWordBackward', data: '' } })
    expect(phoneField.state.text).toBe('+1 201 555')
  })

  it('writes the number of a default value in the format of its own calling code', () => {
    const phoneField = simulatePhone({ defaultCountry: 'DE', defaultValue: '+12015550123' })

    expect(phoneField.state.text).toBe('+1 201 555-0123')
  })
})
