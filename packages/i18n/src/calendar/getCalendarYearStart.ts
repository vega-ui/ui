import { CalendarSystem } from '../types'

/**
 * First day of the calendar year containing the given ISO day.
 */
export const getCalendarYearStart = (calendar: CalendarSystem, date: string) =>
  calendar.fromFields({ ...calendar.toFields(date), month: 1, day: 1 })
