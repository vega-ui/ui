import { CalendarSystem } from '../types'
import { isoDateToUTC } from '../iso/isoDateToUTC'

/**
 * Creates a function that formats only the day number of ISO `YYYY-MM-DD`
 * days in the given calendar system, without the suffixes some locales add to
 * a standalone day (`15` rather than `15日` in Japanese). Create it once and
 * reuse it to format many days: creating the formatter is the costly part.
 */
export const createCalendarDayFormatter = (
  calendar: CalendarSystem,
  locale: Intl.LocalesArgument,
  format: Intl.DateTimeFormatOptions['day']
) => {
  const formatter = new Intl.DateTimeFormat(locale, { day: format, calendar: calendar.identifier, timeZone: 'UTC' })

  return (date: string) => {
    const utc = isoDateToUTC(date)
    const day = formatter.formatToParts(utc).find(({ type }) => type === 'day')

    return day?.value ?? formatter.format(utc)
  }
}
