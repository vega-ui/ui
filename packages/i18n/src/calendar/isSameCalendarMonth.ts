import { CalendarSystem } from '../types'
import { getCalendarMonthStart } from './getCalendarMonthStart'

/**
 * Whether two ISO days belong to the same calendar month.
 */
export const isSameCalendarMonth = (calendar: CalendarSystem, a: string, b: string) =>
  getCalendarMonthStart(calendar, a) === getCalendarMonthStart(calendar, b)
