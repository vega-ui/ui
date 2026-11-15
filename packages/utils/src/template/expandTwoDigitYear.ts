import { CalendarSystem } from '@vega-ui/i18n'
import { parseISODate } from '../date'

/**
 * Reads a two-digit year of a template like CLDR and ICU do: as the year
 * ending in these digits within 80 years before and 19 years after the year
 * of `referenceDate` (a `YYYY-MM-DD` day, usually today) in a calendar
 * system. With a reference year of 2026, `26` is 2026, `45` is 2045 and `46`
 * is 1946. Returns `undefined` without a valid `referenceDate`.
 */
export const expandTwoDigitYear = (calendar: CalendarSystem, digits: string, referenceDate?: string) => {
  if (referenceDate === undefined || !parseISODate(referenceDate)) return undefined

  const start = calendar.toFields(referenceDate).year - 80
  const offset = (Number(digits) - (start % 100) + 100) % 100

  return start + offset
}
