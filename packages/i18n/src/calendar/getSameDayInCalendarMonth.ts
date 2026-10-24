import { CalendarSystem } from '../types'
import { getCalendarMonthStart } from './getCalendarMonthStart'

/**
 * The day with the same number as `date` in the calendar month containing
 * `month`, clamped to the length of that month.
 */
export const getSameDayInCalendarMonth = (calendar: CalendarSystem, date: string, month: string) => {
  const target = calendar.toFields(getCalendarMonthStart(calendar, month))
  const day = Math.min(calendar.toFields(date).day, calendar.getDaysInMonth(target))

  return calendar.fromFields({ ...target, day })
}
