import { CalendarSystem } from '../types'
import { addCalendarYears } from './addCalendarYears'
import { getCalendarYearStart } from './getCalendarYearStart'

/**
 * Number of calendar years from the year of `from` to the year of `to`;
 * negative when `to` is earlier.
 */
export const getCalendarYearsDistance = (calendar: CalendarSystem, from: string, to: string) => {
  const target = getCalendarYearStart(calendar, to)
  const direction = target < getCalendarYearStart(calendar, from) ? -1 : 1

  let year = getCalendarYearStart(calendar, from)
  let distance = 0

  while (year !== target) {
    year = addCalendarYears(calendar, year, direction)
    distance += direction
  }

  return distance
}
