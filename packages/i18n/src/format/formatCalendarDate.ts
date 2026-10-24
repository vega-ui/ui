import { CalendarSystem } from '../types'
import { createCalendarDateFormatter } from './createCalendarDateFormatter'

/**
 * Formats an ISO `YYYY-MM-DD` day with `Intl.DateTimeFormat` in the given
 * calendar system. To format many days, create one formatter with
 * `createCalendarDateFormatter`.
 */
export const formatCalendarDate = (
  calendar: CalendarSystem,
  date: string,
  locale: Intl.LocalesArgument,
  options: Intl.DateTimeFormatOptions
) => createCalendarDateFormatter(calendar, locale, options)(date)
