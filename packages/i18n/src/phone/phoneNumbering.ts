import { AsYouType, getCountryCallingCode, validatePhoneNumberLength } from 'libphonenumber-js/min'
import { PhoneNumbering, PhoneNumberLength } from '../types'
import { parseNationalPhone } from './parseNationalPhone'
import { parseTypedPhone } from './parseTypedPhone'

const LENGTHS: Partial<Record<string, PhoneNumberLength>> = { TOO_SHORT: 'short', TOO_LONG: 'long' }

/**
 * The phone numbering plan of libphonenumber (`libphonenumber-js/min`): numbers are read,
 * checked and formatted by its metadata, kept up to date with the library.
 */
export const phoneNumbering: PhoneNumbering = {
  format: (text) => new AsYouType().input(text),
  parse: (text, country) => {
    if (text.trim().startsWith('+')) return parseTypedPhone(text)
    if (!country) return undefined

    return parseNationalPhone(text, country)
  },
  getLength: (text, country) => {
    const error = validatePhoneNumberLength(text, country)
    if (error === undefined) return 'possible'

    return LENGTHS[error] ?? 'invalid'
  },
  getCallingCode: (country) => getCountryCallingCode(country),
}
