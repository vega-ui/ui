import { CalendarSystem } from '../types'
import { getCalendarYearEnd } from './getCalendarYearEnd'
import { getCalendarYearStart } from './getCalendarYearStart'
import { addISODays } from '../iso/addISODays'

/**
 * First day of the calendar year that is `amount` years away from the year
 * containing the given ISO day.
 */
export const addCalendarYears = (calendar: CalendarSystem, date: string, amount: number) => {
  let year = getCalendarYearStart(calendar, date)

  for (let step = 0; step < Math.abs(amount); step++) {
    year = amount > 0
      ? addISODays(getCalendarYearEnd(calendar, year), 1)
      : getCalendarYearStart(calendar, addISODays(year, -1))
  }

  return year
}
