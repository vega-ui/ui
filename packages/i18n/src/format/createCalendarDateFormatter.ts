import { CalendarSystem } from '../types'
import { isoDateToUTC } from '../iso/isoDateToUTC'

/**
 * Creates a function that formats ISO `YYYY-MM-DD` days with one
 * `Intl.DateTimeFormat` in the given calendar system. Create it once and
 * reuse it to format many days: creating the formatter is the costly part.
 */
export const createCalendarDateFormatter = (
  calendar: CalendarSystem,
  locale: Intl.LocalesArgument,
  options: Intl.DateTimeFormatOptions
) => {
  const formatter = new Intl.DateTimeFormat(locale, { ...options, calendar: calendar.identifier, timeZone: 'UTC' })

  return (date: string) => formatter.format(isoDateToUTC(date))
}
