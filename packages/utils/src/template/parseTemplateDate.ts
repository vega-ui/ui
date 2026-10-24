import { CalendarSystem, padDatePart, toLatinDigits } from '@vega-ui/i18n'
import { getTemplateSegments } from './getTemplateSegments'
import { getTemplateSegmentRange, TemplateFields } from './getTemplateSegmentRange'
import { formatTemplateDate } from './formatTemplateDate'

/**
 * Parses a string written by a template (see `formatTemplateDate`) in a
 * calendar system into a `YYYY-MM-DD` string, or into `YYYY-MM-DDTHH:mm[:ss]`
 * when the template has a time.
 * Digits of other numbering systems (`۱۴۰۵/۰۱/۰۱`) are read as Latin digits.
 * Returns `undefined` for an incomplete, malformed or non-existent value.
 */
export const parseTemplateDate = (calendar: CalendarSystem, text: string, template: string) => {
  const value = toLatinDigits(text)

  if (value.length !== template.length) return undefined

  const segments = getTemplateSegments(template)
  const fields: TemplateFields = {}

  for (const { type, start, end } of segments) {
    const part = value.slice(start, end)
    if (!/^\d+$/.test(part)) return undefined

    fields[type] = Number(part)
  }

  const { y: year, m: month = 1, d: day = 1, H: hours, M: minutes = 0, S: seconds } = fields
  if (year === undefined) return undefined

  for (const type of ['y', 'm', 'd', 'H', 'M', 'S'] as const) {
    const [min, max] = getTemplateSegmentRange(calendar, type, fields)
    const number = fields[type]

    if (number !== undefined && (number < min || number > max)) return undefined
  }

  const date = calendar.fromFields({ year, month, day })
  const time = [hours, minutes, seconds]
    .filter((part) => part !== undefined)
    .map((part) => padDatePart(part))
    .join(':')
  const result = hours === undefined ? date : `${date}T${time}`

  if (formatTemplateDate(calendar, result, template) !== value) return undefined

  return result
}
