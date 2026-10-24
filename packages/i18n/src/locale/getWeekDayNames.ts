import { DAYS_IN_WEEK } from '../iso/daysInWeek'
import { getFirstDayOfWeek } from './getFirstDayOfWeek'

/**
 * Weekday names of a locale in the given style, starting from
 * `firstDayOfWeek` (`0` = Sunday), by default the first day of the week of
 * the locale. Without a locale the runtime locale is used.
 */
export const getWeekDayNames = (
  locale?: Intl.LocalesArgument,
  style: 'long' | 'short' | 'narrow' = 'long',
  firstDayOfWeek?: number
): string[] => {
  const baseSunday = new Date(Date.UTC(2025, 0, 5))
  const formatter = new Intl.DateTimeFormat(locale, { weekday: style, timeZone: 'UTC' })
  
  const namesSundayFirst = Array.from({ length: DAYS_IN_WEEK }, (_, i) => {
    const d = new Date(baseSunday)
    d.setUTCDate(baseSunday.getUTCDate() + i)
    return formatter.format(d)
  })
  
  const startIndex = firstDayOfWeek ?? getFirstDayOfWeek(locale)
  return namesSundayFirst.slice(startIndex).concat(namesSundayFirst.slice(0, startIndex))
}
