import { CalendarSystem, toLatinDigits } from '@vega-ui/i18n'
import { getTemplateSegments } from './getTemplateSegments'
import { getTemplateSegmentRange, TemplateFields } from './getTemplateSegmentRange'
import { parseTemplateDate } from './parseTemplateDate'
import { formatTemplateDate } from './formatTemplateDate'

export interface NormalizeTemplateDateOptions {
  /**
   * Earliest allowed value as a `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm[:ss]` string.
   */
  min?: string

  /**
   * Latest allowed value as a `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm[:ss]` string.
   */
  max?: string
}

/**
 * Corrects a string being typed by a template (see `formatTemplateDate`)
 * in a calendar system: complete segments are clamped to the values that exist
 * (the day to the length of the month, the month to the months of the year),
 * and a single digit that cannot start a two-digit segment is padded with a
 * zero, so typing `4` into the day gives `04`. A complete value is clamped
 * to `min` and `max`. Digits of other numbering systems are replaced with
 * Latin digits.
 */
export const normalizeTemplateDate = (
  calendar: CalendarSystem,
  text: string,
  template: string,
  bounds: NormalizeTemplateDateOptions = {}
) => {
  const value = toLatinDigits(text)

  const segments = getTemplateSegments(template)
  const fields: TemplateFields = {}
  let result = value

  for (const type of ['y', 'm', 'd', 'H', 'M', 'S'] as const) {
    const segment = segments.find((segment) => segment.type === type)
    if (!segment) continue

    const part = value.slice(segment.start, segment.end)
    if (part.length < segment.end - segment.start) continue

    const [min, max] = getTemplateSegmentRange(calendar, type, fields)
    const number = Math.min(Math.max(Number(part), min), max)

    fields[type] = number
    result = result.slice(0, segment.start) + String(number).padStart(part.length, '0') + result.slice(segment.end)
  }

  const date = parseTemplateDate(calendar, result, template)
  if (date && bounds.min && date < bounds.min) return formatTemplateDate(calendar, bounds.min, template)
  if (date && bounds.max && date > bounds.max) return formatTemplateDate(calendar, bounds.max, template)

  const last = segments.find(({ start, end }) => value.length > start && value.length < end)
  if (!last || last.end - last.start !== 2) return result

  const digit = value.slice(last.start)
  const [, max] = getTemplateSegmentRange(calendar, last.type, fields)
  if (Number(digit) * 10 <= max) return result

  return result.slice(0, last.start) + digit.padStart(2, '0')
}
