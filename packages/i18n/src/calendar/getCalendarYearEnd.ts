import { CalendarSystem } from '../types'

/**
 * Last day of the calendar year containing the given ISO day.
 */
export const getCalendarYearEnd = (calendar: CalendarSystem, date: string) => {
  const fields = calendar.toFields(date)
  const month = calendar.getMonthsInYear(fields)

  return calendar.fromFields({ ...fields, month, day: calendar.getDaysInMonth({ ...fields, month }) })
}
