import { getTemplateSegments, TemplateSegment, TimeSegmentType } from './getTemplateSegments'
import { isTimeSegmentType } from './isTimeSegmentType'
import { getTimeSegmentRange } from './getTimeSegmentRange'

/**
 * Steps the hours, minutes or seconds segment of a string written by a
 * template (see `formatTemplateDate`) at the caret `position` in the
 * `direction`, wrapping around the segment's range. Like the arrows of a
 * native `datetime-local` input with `step`, the hours move by one and the
 * minutes and seconds by `step`. Returns `undefined` when the caret is not in
 * a time segment.
 */
export const stepTimeSegment = (value: string, template: string, position: number, direction: 1 | -1, step = 1) => {
  const segment = getTemplateSegments(template).find((segment): segment is TemplateSegment<TimeSegmentType> =>
    isTimeSegmentType(segment.type) && segment.start <= position && position <= segment.end
  )
  if (!segment) return undefined

  const { type, start, end } = segment
  const [, max] = getTimeSegmentRange(type)
  const number = Number(value.slice(start, end).padEnd(end - start, '0'))
  const delta = type === 'H' ? direction : direction * step
  const stepped = ((number + delta) % (max + 1) + max + 1) % (max + 1)

  return value.slice(0, start) + String(stepped).padStart(end - start, '0') + value.slice(end)
}
