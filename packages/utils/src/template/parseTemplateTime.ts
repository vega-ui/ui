import { padDatePart, toLatinDigits } from '@vega-ui/i18n'
import { getTemplateSegments } from './getTemplateSegments'
import { isTimeSegmentType } from './isTimeSegmentType'
import { getTimeSegmentRange } from './getTimeSegmentRange'
import { formatTemplateTime } from './formatTemplateTime'

/**
 * Reads a time typed by a template of `HH`, `MM` and `SS` segments
 * (see `getTimeTemplate`) as `HH:mm` or `HH:mm:ss`. Returns `undefined` for an
 * incomplete or invalid time. Digits of other numbering systems are accepted.
 */
export const parseTemplateTime = (text: string, template: string) => {
  const value = toLatinDigits(text)

  if (value.length !== template.length) return undefined

  const parts: string[] = []

  for (const { type, start, end } of getTemplateSegments(template)) {
    if (!isTimeSegmentType(type)) return undefined

    const part = value.slice(start, end)
    if (!/^\d+$/.test(part)) return undefined

    const [min, max] = getTimeSegmentRange(type)
    const number = Number(part)
    if (number < min || number > max) return undefined

    parts.push(padDatePart(number))
  }

  const time = parts.join(':')
  if (formatTemplateTime(time, template) !== value) return undefined

  return time
}
