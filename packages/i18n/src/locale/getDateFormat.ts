import { CalendarSystem } from '../types'
import { getNumericDateParts } from './getNumericDateParts'

/**
 * Order of the numeric date fields in a locale and calendar system as a
 * format with its separators: `DD.MM.YYYY` in `de-DE`, `MM/DD/YYYY` in
 * `en-US`. Eras are left out (`YYYY/MM/DD` for `ja-JP` in the Japanese
 * calendar); a calendar that names its months (Hebrew, Chinese) uses the
 * Gregorian order of the locale. Without a locale the runtime locale is used.
 */
export const getDateFormat = (calendar: CalendarSystem, locale?: Intl.LocalesArgument) => {
  const tokens = getNumericDateParts(calendar, locale).map(({ type, value }: { type: string, value: string }) => {
    if (type === 'day') return 'DD'
    if (type === 'month') return 'MM'
    if (type === 'year' || type === 'relatedYear') return 'YYYY'
    if (type === 'literal') return value

    return ''
  })

  return tokens.join('').trim()
}
