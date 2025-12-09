import { getFirstDayOfWeek } from './getFirstDayOfWeek';

export const getWeekDayNames = (
  locale: string = 'en-US',
  style: 'long' | 'short' | 'narrow' = 'long',
  firstDayOfWeek: number
): string[] => {
  const baseSunday = new Date(Date.UTC(2025, 0, 5))
  const formatter = new Intl.DateTimeFormat(locale, { weekday: style, timeZone: 'UTC' })
  
  const namesSundayFirst = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(baseSunday)
    d.setUTCDate(baseSunday.getUTCDate() + i)
    return formatter.format(d)
  })
  
  const startIndex = firstDayOfWeek ?? getFirstDayOfWeek(locale)
  return namesSundayFirst.slice(startIndex).concat(namesSundayFirst.slice(0, startIndex))
}
