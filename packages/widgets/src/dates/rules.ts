import { addCalendarYears, getCalendarYearsDistance, getCalendarYearStart, getSameDayInCalendarMonth, isSameCalendarMonth } from '@vega-ui/i18n'
import { clampDate } from './clampDate'
import { getAvailableDate } from './getAvailableDate'
import { getDayNavigationTarget } from './getDayNavigationTarget'
import { getDayTabStop } from './getDayTabStop'
import { getMonthTabStop } from './getMonthTabStop'
import { getYearTabStop } from './getYearTabStop'
import { isDateAvailable } from './isDateAvailable'
import { PeriodRules } from './widget'

export const dayRules: PeriodRules = {
  tabStop: (focused, candidates, context) => getDayTabStop(context.calendar, focused, [...candidates], context),
  navigate: getDayNavigationTarget,
  show: (date, active, context) => {
    if (active === undefined) return undefined
    if (isSameCalendarMonth(context.calendar, active, date)) return active

    return getAvailableDate(context.calendar, getSameDayInCalendarMonth(context.calendar, active, date), context)
  },
}

export const monthRules: PeriodRules = {
  tabStop: (focused, candidates, context) => getMonthTabStop(context.calendar, focused, [...candidates], context),
}

const resolveYear = (date: string, context: Parameters<PeriodRules['tabStop']>[2]) => {
  const target = getCalendarYearStart(context.calendar, clampDate(date, context.from, context.to))
  return isDateAvailable(target, context) ? target : undefined
}

export const yearRules: PeriodRules = {
  tabStop: (focused, candidates, context) => getYearTabStop(context.calendar, focused, [...candidates], context),
  show: (date, _active, context) => resolveYear(date, context),
  resolve: resolveYear,
  page: (from, offset, context) => resolveYear(addCalendarYears(context.calendar, from, offset), context),
  pageEdge: (from, origin, period, edge, context) => {
    const anchor = getCalendarYearStart(context.calendar, origin)
    const index = Math.floor(getCalendarYearsDistance(context.calendar, anchor, from) / period)
    const start = addCalendarYears(context.calendar, anchor, index * period)
    if (edge === 'start') return resolveYear(start, context)

    return resolveYear(addCalendarYears(context.calendar, start, period - 1), context)
  },
}
