import { AsYouType } from 'libphonenumber-js/min'
import { PhoneNumber } from '../types'

export const parseTypedPhone = (text: string): PhoneNumber | undefined => {
  const formatter = new AsYouType()
  formatter.input(text)
  const callingCode = formatter.getCallingCode()
  if (!callingCode) return undefined

  return { callingCode, nationalNumber: formatter.getNumber()?.nationalNumber ?? '', country: formatter.getCountry() }
}
