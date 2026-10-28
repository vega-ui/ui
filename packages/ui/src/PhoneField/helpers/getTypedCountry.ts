import { AsYouType, CountryCode } from 'libphonenumber-js'

export const getTypedCountry = (phone: string): CountryCode | undefined => {
  const asYouType = new AsYouType()
  asYouType.input(phone)

  return asYouType.getCountry()
}
