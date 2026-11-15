import { CalendarSystem, toLatinDigits } from '@vega-ui/i18n'
import { getTemplateSegments } from './getTemplateSegments'
import { getTemplateSegmentRange, TemplateFields } from './getTemplateSegmentRange'
import { expandTwoDigitYear } from './expandTwoDigitYear'

export interface NormalizeTemplateDateOptions {
  /**
   * `YYYY-MM-DD` day that a two-digit year is read around, usually today,
   * see `expandTwoDigitYear`.
   */
  referenceDate?: string
}

/**
 * Corrects a string being typed by a template (see `formatTemplateDate`)
 * in a calendar system: complete segments are clamped to the values that exist
 * (the day to the length of the month, the month to the months of the year),
 * and a single digit that cannot start a two-digit segment is padded with a
 * zero, so typing `4` into the day gives `04`. A two-digit year is kept as
 * typed. Digits of other
 * numbering systems are replaced with Latin digits.
 */
export const normalizeTemplateDate = (
  calendar: CalendarSystem,
  text: string,
  template: string,
  options: NormalizeTemplateDateOptions = {}
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

    if (type === 'y' && part.length === 2) {
      fields.y = expandTwoDigitYear(calendar, part, options.referenceDate)
      continue
    }

    const [min, max] = getTemplateSegmentRange(calendar, type, fields)
    const number = Math.min(Math.max(Number(part), min), max)

    fields[type] = number
    result = result.slice(0, segment.start) + String(number).padStart(part.length, '0') + result.slice(segment.end)
  }

  const last = segments.find(({ start, end }) => value.length > start && value.length < end)
  if (!last || last.end - last.start !== 2) return result

  const digit = value.slice(last.start)
  const [, max] = getTemplateSegmentRange(calendar, last.type, fields)
  if (Number(digit) * 10 <= max) return result

  return result.slice(0, last.start) + digit.padStart(2, '0')
}
