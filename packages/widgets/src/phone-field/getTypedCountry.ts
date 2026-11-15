import { PhoneNumbering } from '@vega-ui/i18n'

export const getTypedCountry = (numbering: PhoneNumbering, phone: string) => numbering.parse(phone)?.country
