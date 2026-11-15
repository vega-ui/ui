import { parsePhoneNumberWithError } from 'libphonenumber-js/min'
import { PhoneCountry, PhoneNumber } from '../types'

export const parseNationalPhone = (text: string, country: PhoneCountry): PhoneNumber | undefined => {
  try {
    const phone = parsePhoneNumberWithError(text, country)
    return { callingCode: phone.countryCallingCode, nationalNumber: phone.nationalNumber, country: phone.country }
  } catch {
    return undefined
  }
}
