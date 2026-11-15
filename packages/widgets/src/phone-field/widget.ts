import { act, browser, command, controlled, defineWidget, handled, internal, keep, listening, matching, ROOT, runSteps, state, Step, text } from '@vega-ui/core'
import { clamp } from '@vega-ui/utils'
import { PhoneCountry, PhoneNumbering, phoneNumbering } from '@vega-ui/i18n'
import { applyPatternEdit, calibratePattern, maskedField, PendingText } from '../mask'
import { callingCodeOf, getPhoneInvalidity, phoneCaretRange, phoneMaskOf, phoneRules, phoneValueOf } from './phoneMask'
import { getTypedCountry } from './getTypedCountry'

export const SELECT_COUNTRY = command('selectCountry')

const NO_COUNTRY = '' as PhoneCountry

interface PhoneFieldStart {
  readonly numbering: PhoneNumbering
  readonly value?: string
  readonly defaultValue?: string
  readonly defaultCountry?: PhoneCountry
}

const initialCountry = ({ numbering, value, defaultValue, defaultCountry }: PhoneFieldStart) => getTypedCountry(numbering, value ?? defaultValue ?? '') ?? defaultCountry

export const phoneFieldShape = state({
  options: { strict: true, numbering: phoneNumbering },
  owns: { value: controlled(''), country: controlled(NO_COUNTRY, initialCountry) },
  follows: ['strict', 'numbering'],
  internal: {
    text: internal(''),
    pending: internal(undefined as PendingText | undefined),
    committed: internal(''),
    touched: internal(false),
  },
  observes: { readOnly: matching(ROOT, '[readonly]'), required: matching(ROOT, '[required]') },
})

type PhoneFieldSnapshot = typeof phoneFieldShape.__snapshot

const rulesOf = (state: PhoneFieldSnapshot, shown: string) => phoneRules(phoneMaskOf(state.options.numbering, shown, state.country, state.options.strict))

const detected = (state: PhoneFieldSnapshot, shown: string) => {
  const typed = getTypedCountry(state.options.numbering, shown)
  if (typed === undefined || typed === state.country) return state

  return phoneFieldShape.country.set(state, typed)
}

const phoneField = maskedField<PhoneFieldSnapshot, string>({
  text: phoneFieldShape.text,
  value: phoneFieldShape.value,
  pending: phoneFieldShape.pending,
  committed: phoneFieldShape.committed,
  touched: phoneFieldShape.touched,
  edit: (state, field, edit) => applyPatternEdit(field, edit, rulesOf(state, field.value)),
  calibrate: (state, field) => calibratePattern(field, rulesOf(state, field.value)),
  parse: (state, shown) => phoneValueOf(state.options.numbering, shown),
  format: (state, value) => calibratePattern({ value, selection: [value.length, value.length] }, rulesOf(state, value)).value,
  follow: detected,
})

export const { defaultTextOf } = phoneField

const resetting = listening<PhoneFieldSnapshot>([browser.reset], (state, input) => {
  if (!input.is(browser.reset)) return undefined

  const country = phoneFieldShape.country.controlled(state) ? state.country : initialCountry(state.options) ?? NO_COUNTRY

  return runSteps(phoneField.steps, phoneFieldShape.country.set(state, country), input)
})

const selecting: Step<PhoneFieldSnapshot> = (state, input) => {
  if (!input.is(SELECT_COUNTRY)) return undefined

  const next = phoneFieldShape.country.set(state, input.to as PhoneCountry)
  if (state.readOnly) return handled(next, [act.focusPart(ROOT)])

  const callingCode = callingCodeOf(next.options.numbering, next.country)
  const shown = calibratePattern({ value: callingCode, selection: [callingCode.length, callingCode.length] }, rulesOf(next, callingCode))
  const answer = phoneField.shown(next, shown, true)

  return handled(answer.state, [act.focusPart(ROOT), ...answer.actions])
}

const guarding = listening<PhoneFieldSnapshot>([text.select], (state, input) => {
  if (!input.is(text.select) || !input.field) return undefined

  const [from, to] = input.field.selection
  const [min, max] = phoneCaretRange(phoneMaskOf(state.options.numbering, input.field.value, state.country, state.options.strict), input.field)
  const start = clamp(min, from, max)
  const end = clamp(min, to, max)
  if (start === from && end === to) return undefined

  return keep(state, [act.setText(ROOT, input.field.value, [start, end])])
})

export const phoneFieldWidget = defineWidget({
  state: phoneFieldShape,

  step: [resetting, selecting, guarding, ...phoneField.steps],

  output: {
    root: {
      ...phoneFieldShape.part((state) => [state.touched] as const, ([touched]) => ({ 'data-user-edited': touched || undefined })),
      props: {
        select: (state: PhoneFieldSnapshot) => [getPhoneInvalidity(state.options.numbering, state.value, state.required)],
        render: ([invalidAs]) => ({ invalidAs }),
      },
    },
  },
})
