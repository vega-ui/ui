import { CalendarSystem } from '../types'

/**
 * Last day of the calendar month containing the given ISO day.
 */
export const getCalendarMonthEnd = (calendar: CalendarSystem, date: string) => {
  const fields = calendar.toFields(date)

  return calendar.fromFields({ ...fields, day: calendar.getDaysInMonth(fields) })
}
