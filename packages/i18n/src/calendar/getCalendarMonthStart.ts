import { CalendarSystem } from '../types'

/**
 * First day of the calendar month containing the given ISO day.
 */
export const getCalendarMonthStart = (calendar: CalendarSystem, date: string) =>
  calendar.fromFields({ ...calendar.toFields(date), day: 1 })
