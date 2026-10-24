import { CalendarSystem } from '../types'
import { addCalendarMonths } from './addCalendarMonths'
import { getCalendarMonthStart } from './getCalendarMonthStart'

/**
 * Number of calendar months from the month of `from` to the month of `to`;
 * negative when `to` is earlier.
 */
export const getCalendarMonthsDistance = (calendar: CalendarSystem, from: string, to: string) => {
  const target = getCalendarMonthStart(calendar, to)
  const direction = target < getCalendarMonthStart(calendar, from) ? -1 : 1

  let month = getCalendarMonthStart(calendar, from)
  let distance = 0

  while (month !== target) {
    month = addCalendarMonths(calendar, month, direction)
    distance += direction
  }

  return distance
}
