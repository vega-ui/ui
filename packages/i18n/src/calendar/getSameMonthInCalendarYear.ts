import { CalendarSystem } from '../types'
import { getCalendarYearStart } from './getCalendarYearStart'

/**
 * First day of the month with the same number as the month of `month` in the
 * calendar year containing `year`, clamped to the number of months in that year.
 */
export const getSameMonthInCalendarYear = (calendar: CalendarSystem, month: string, year: string) => {
  const target = calendar.toFields(getCalendarYearStart(calendar, year))
  const monthNumber = Math.min(calendar.toFields(month).month, calendar.getMonthsInYear(target))

  return calendar.fromFields({ ...target, month: monthNumber, day: 1 })
}
