import { CalendarSystem } from '../types'
import { createCalendarDayFormatter } from './createCalendarDayFormatter'

/**
 * Formats only the day number of an ISO `YYYY-MM-DD` day in the given calendar
 * system, without the suffixes some locales add to a standalone day
 * (`15` rather than `15日` in Japanese). To format many days, create one
 * formatter with `createCalendarDayFormatter`.
 */
export const formatCalendarDay = (
  calendar: CalendarSystem,
  date: string,
  locale: Intl.LocalesArgument,
  format: Intl.DateTimeFormatOptions['day']
) => createCalendarDayFormatter(calendar, locale, format)(date)
