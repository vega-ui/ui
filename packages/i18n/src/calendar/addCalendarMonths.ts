import { CalendarSystem } from '../types'
import { getCalendarMonthEnd } from './getCalendarMonthEnd'
import { getCalendarMonthStart } from './getCalendarMonthStart'
import { addISODays } from '../iso/addISODays'

/**
 * First day of the calendar month that is `amount` months away from the month
 * containing the given ISO day.
 */
export const addCalendarMonths = (calendar: CalendarSystem, date: string, amount: number) => {
  let month = getCalendarMonthStart(calendar, date)

  for (let step = 0; step < Math.abs(amount); step++) {
    month = amount > 0
      ? addISODays(getCalendarMonthEnd(calendar, month), 1)
      : getCalendarMonthStart(calendar, addISODays(month, -1))
  }

  return month
}
