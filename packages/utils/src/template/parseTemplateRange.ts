import { CalendarSystem } from '@vega-ui/i18n'
import { parseTemplateDate } from './parseTemplateDate'

/**
 * Parses a range written as two dates by a template joined by `separator`
 * into a `[start, end]` tuple of `YYYY-MM-DD` strings. A bound that is
 * incomplete or malformed is `''`; without a start the whole range is empty.
 * A two-digit year is read around the year of `referenceDate`, see
 * `expandTwoDigitYear`.
 */
export const parseTemplateRange = (
  calendar: CalendarSystem,
  value: string,
  template: string,
  separator: string,
  referenceDate?: string
): [start: string, end: string] => {
  const start = parseTemplateDate(calendar, value.slice(0, template.length), template, referenceDate)
  if (!start) return ['', '']

  const end = parseTemplateDate(calendar, value.slice(template.length + separator.length), template, referenceDate)

  return [start, end ?? '']
}
