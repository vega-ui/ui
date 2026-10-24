import { CalendarSystem } from '@vega-ui/i18n'
import { TemplateSegmentType } from './getTemplateSegments'
import { isTimeSegmentType } from './isTimeSegmentType'
import { getTimeSegmentRange } from './getTimeSegmentRange'

export type TemplateFields = Partial<Record<TemplateSegmentType, number>>

/**
 * Smallest and largest value of a template segment in a calendar system. The
 * month and the day depend on the fields already known: without a year the
 * month may be up to 13, without a month the day may be up to 31.
 */
export const getTemplateSegmentRange = (
  calendar: CalendarSystem,
  type: TemplateSegmentType,
  fields: TemplateFields
): [min: number, max: number] => {
  const { y: year, m: month } = fields

  if (isTimeSegmentType(type)) return getTimeSegmentRange(type)
  if (type === 'y') return [1, 9999]

  if (type === 'm') {
    if (year === undefined) return [1, 13]
    return [1, calendar.getMonthsInYear({ year })]
  }

  if (year === undefined || month === undefined) return [1, 31]
  return [1, calendar.getDaysInMonth({ year, month })]
}
