import {
  addCalendarMonths,
  addCalendarYears,
  addISODays,
  CalendarSystem,
  DAYS_IN_WEEK,
  getCalendarMonthEnd,
  getCalendarMonthStart,
  getISOWeekday,
  getSameDayInCalendarMonth,
  getSameMonthInCalendarYear,
} from '@vega-ui/i18n'
import { GridIntent } from '@vega-ui/core'
import { clampDate } from './clampDate'
import { DateAvailability } from './isDateAvailable'
import { findAvailableDate } from './findAvailableDate'
import { getAvailableDate } from './getAvailableDate'

export type DayNavigationIntent = GridIntent | 'yearUp' | 'yearDown'

interface DayNavigationOptions extends DateAvailability {
  calendar: CalendarSystem
  weekStartsOn: number
}

const getSameDayInMonths = (calendar: CalendarSystem, date: string, amount: number) =>
  getSameDayInCalendarMonth(calendar, date, addCalendarMonths(calendar, date, amount))

const getSameDayInYears = (calendar: CalendarSystem, date: string, amount: number) => {
  const month = getSameMonthInCalendarYear(calendar, date, addCalendarYears(calendar, date, amount))

  return getSameDayInCalendarMonth(calendar, date, month)
}

export const getDayNavigationTarget = (intent: DayNavigationIntent, from: string, options: DayNavigationOptions) => {
  const { calendar, weekStartsOn } = options

  if (intent === 'forward') return findAvailableDate(addISODays(from, 1), 1, options)
  if (intent === 'backward') return findAvailableDate(addISODays(from, -1), -1, options)
  if (intent === 'down') return findAvailableDate(addISODays(from, DAYS_IN_WEEK), DAYS_IN_WEEK, options)
  if (intent === 'up') return findAvailableDate(addISODays(from, -DAYS_IN_WEEK), -DAYS_IN_WEEK, options)

  const weekStart = addISODays(from, -((getISOWeekday(from) - weekStartsOn + DAYS_IN_WEEK) % DAYS_IN_WEEK))
  if (intent === 'rowStart') return findAvailableDate(weekStart, 1, options, from)
  if (intent === 'rowEnd') return findAvailableDate(addISODays(weekStart, DAYS_IN_WEEK - 1), -1, options, from)

  if (intent === 'gridStart') return findAvailableDate(getCalendarMonthStart(calendar, from), 1, options, from)
  if (intent === 'gridEnd') return findAvailableDate(getCalendarMonthEnd(calendar, from), -1, options, from)

  const target = {
    pageUp: () => getSameDayInMonths(calendar, from, -1),
    pageDown: () => getSameDayInMonths(calendar, from, 1),
    yearUp: () => getSameDayInYears(calendar, from, -1),
    yearDown: () => getSameDayInYears(calendar, from, 1),
  }[intent]()

  return getAvailableDate(calendar, clampDate(target, options.from, options.to), options)
}
