import { CalendarSystem } from '../types'
import { getNumericDateParts } from './getNumericDateParts'

/**
 * Separator between the numeric date fields in a locale and calendar system:
 * `.` in `de-DE`, `/` in `en-US` and `ar-SA` (without its bidi marks); `/`
 * when the fields have none. Without a locale the runtime locale is used.
 */
export const getDateSeparator = (calendar: CalendarSystem, locale?: Intl.LocalesArgument) => {
  const parts = getNumericDateParts(calendar, locale)

  const isField = (part?: Intl.DateTimeFormatPart) => {
    if (!part) return false
    return ['day', 'month', 'year', 'relatedYear'].includes(part.type)
  }

  const separator = parts.find((part, index) =>
    part.type === 'literal' && isField(parts[index - 1]) && isField(parts[index + 1])
  )

  return separator?.value ?? '/'
}
