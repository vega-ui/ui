import { CalendarSystem } from '../types'
import { isoDateToUTC } from '../iso/isoDateToUTC'
import { gregorianCalendar } from '../systems/gregorianCalendar'

/**
 * Parts of a sample day formatted with numeric fields in a locale and
 * calendar system, without the bidi marks some locales put into literals.
 * A calendar that names its months even in a numeric date (Hebrew, Chinese)
 * falls back to the Gregorian order and separators of the same locale.
 */
export const getNumericDateParts = (calendar: CalendarSystem, locale?: Intl.LocalesArgument): Intl.DateTimeFormatPart[] => {
  const formatter = new Intl.DateTimeFormat(locale, {
    calendar: calendar.identifier,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  })

  const parts = formatter
    .formatToParts(isoDateToUTC('1970-01-02'))
    .map(({ type, value }) => ({ type, value: type === 'literal' ? value.replace(/[‎‏؜]/g, '') : value }))

  const month = parts.find(({ type }) => type === 'month')
  const isNumeric = month !== undefined && /^\p{Nd}+$/u.test(month.value)

  if (isNumeric || calendar.identifier === gregorianCalendar.identifier) return parts

  return getNumericDateParts(gregorianCalendar, locale)
}
