import { TextState, ValidationAttributes } from '@vega-ui/core'
import { PhoneCountry, PhoneNumbering } from '@vega-ui/i18n'
import { MaskEntry, PatternRules, Preprocessed } from '../mask'

export interface PhoneMask {
  readonly numbering: PhoneNumbering
  readonly country: PhoneCountry | ''
  readonly callingCode: string
  readonly strict: boolean
}

const TEMPLATE_FILLER = 'x'

const SEPARATOR = '-'

const MIN_LENGTH = 3

const SHORTEST_PASTED_NUMBER = 2

const DIGIT = /\d/

const templateOf = (numbering: PhoneNumbering, value: string) => {
  const initial = numbering.format(value.replace(/[^\d+]/g, '')).replace(/[\d+]/g, TEMPLATE_FILLER)

  const groups = initial.split(' ')
  if (groups.length === 1) return initial.trim()

  return `${groups.slice(0, 2).join(' ')} ${groups.slice(2).join(SEPARATOR)}`.trim()
}

const patternOf = (value: string, template: string, prefix: string): MaskEntry[] => {
  if (!template) return [...prefix, ...new Array<RegExp>(Math.max(value.length - prefix.length, prefix.length)).fill(DIGIT)]

  const rest = Array.from(template.slice(prefix.length)).map((char) => (char === TEMPLATE_FILLER || DIGIT.test(char) ? DIGIT : char))

  return [...prefix, ...rest]
}

const digitsOf = (value: string) => value.replace(/\D/g, '').length

const MISMATCH: ValidationAttributes = { pattern: '\\d', value: '-' }

const MISSING: ValidationAttributes = { required: true }

const numberOf = (numbering: PhoneNumbering, text: string, country: PhoneCountry | '') => {
  const phone = numbering.parse(text, country || undefined)
  if (phone) return `+${phone.callingCode}${phone.nationalNumber}`

  return text.trim().startsWith('+') ? `+${text.replace(/\D/g, '')}` : ''
}

const validated = (numbering: PhoneNumbering, prefix: string, country: PhoneCountry | '') => (field: TextState, data: string): Preprocessed => {
  const { value, selection } = field
  const includesPrefix = selection[0] < prefix.length

  if (value && !value.startsWith(prefix.trim()) && !data) {
    return { field: { value: numbering.format(numberOf(numbering, value, country)), selection }, data }
  }

  const phone = numbering.parse(data, country || undefined)
  if (!phone || phone.nationalNumber.length < SHORTEST_PASTED_NUMBER) return { field, data }

  const length = numbering.getLength(data, country || undefined)
  if (length === 'long' || length === 'invalid') return { field, data }
  if (includesPrefix) return { field: { value: '', selection }, data: `+${phone.callingCode} ${phone.nationalNumber}` }

  return { field: { value: prefix, selection }, data: phone.nationalNumber }
}

const prefixed = (prefix: string, field: TextState, initial: TextState): TextState => {
  if (field.value.startsWith(prefix)) return field
  if (!field.value && !initial.value.startsWith(prefix)) return field

  let value = field.value
  Array.from(prefix).forEach((char, index) => {
    if (value[index] !== char) value = value.slice(0, index) + char + value.slice(index)
  })

  const added = value.length - field.value.length
  const [from, to] = field.selection

  return { value, selection: [from + added, to + added] }
}

const isTooLong = (numbering: PhoneNumbering, text: string) => numbering.getLength(text) === 'long'

const cut = (numbering: PhoneNumbering, field: TextState): TextState => {
  if (field.value.length <= MIN_LENGTH) return field

  let value = field.value
  while (isTooLong(numbering, value)) value = value.slice(0, -1)

  return { value, selection: field.selection }
}

/**
 * Returns the mask of a phone text: the calling code is the one the text
 * starts with, or the one of `country` while the text has none.
 */
export const phoneMaskOf = (numbering: PhoneNumbering, text: string, country: PhoneCountry | '', strict: boolean): PhoneMask => {
  const typed = numbering.parse(text)?.callingCode
  if (typed) return { numbering, country, callingCode: typed, strict }
  if (!country) return { numbering, country, callingCode: '', strict }

  return { numbering, country, callingCode: numbering.getCallingCode(country), strict }
}

/**
 * Creates the rules of a phone mask for one edit: the template follows the
 * number typed so far, like `+1 xxx xxx-xxxx`. A strict mask keeps the
 * calling code as a prefix.
 */
export const phoneRules = ({ numbering, country, callingCode, strict }: PhoneMask): PatternRules => {
  const strictCode = strict ? callingCode : ''
  const prefix = strictCode ? `+${strictCode} ` : '+'
  const remembered = { template: '', digits: 0 }

  return {
    mask: ({ value }) => {
      const typed = strictCode && !value.startsWith('+') ? prefix + value : value
      const template = templateOf(numbering, typed)
      const digits = digitsOf(typed)
      const keeps = template.length < remembered.template.length && digits > remembered.digits
      if (!keeps) remembered.template = template
      remembered.digits = digits

      if (!strictCode && remembered.template.length === 1) return ['+', DIGIT]

      return patternOf(typed, remembered.template, prefix)
    },
    preprocess: validated(numbering, prefix, country),
    postprocess: (field, initial) => cut(numbering, strictCode ? prefixed(prefix, field, initial) : field),
  }
}

/**
 * Returns the range a collapsed caret may take in a strict phone mask: after
 * the calling code.
 */
export const phoneCaretRange = ({ callingCode, strict }: PhoneMask, field: TextState): TextState['selection'] => {
  const [from, to] = field.selection
  const start = strict && callingCode && from === to ? `+${callingCode} `.length : 0

  return [start, field.value.length]
}

/**
 * Returns the text a phone field shows for its country: the calling code.
 */
export const callingCodeOf = (numbering: PhoneNumbering, country: PhoneCountry) => `+${numbering.getCallingCode(country)}`

/**
 * Returns the number of a phone text in E.164, like `+79123456789`: the
 * digits typed so far, `''` while the text has no digit after the calling
 * code.
 */
export const phoneValueOf = (numbering: PhoneNumbering, text: string) => {
  const phone = numbering.parse(text)
  if (!phone?.nationalNumber) return ''

  return `+${phone.callingCode}${phone.nationalNumber}`
}

/**
 * Returns the attributes of a native input as invalid as a number that cannot
 * be a phone number by its length, or as an empty number of a `required` field
 * that shows only the calling code; `undefined` for a possible or allowed
 * empty one.
 */
export const getPhoneInvalidity = (numbering: PhoneNumbering, value: string, required = false): ValidationAttributes | undefined => {
  if (value === '' && required) return MISSING
  if (value === '') return undefined

  if (numbering.getLength(value) === 'possible') return undefined

  return MISMATCH
}
