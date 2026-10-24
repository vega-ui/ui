import { CalendarSystem } from '@vega-ui/i18n'
import { getTemplateSegments } from './getTemplateSegments'

/**
 * Formats a `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm[:ss]` string by a template in a
 * calendar system.
 *
 * In the template, `dd`, `mm` and `yyyy` are the day, month and year of the
 * calendar, `HH`, `MM` and `SS` are hours, minutes and seconds; every other
 * character is kept as is. Example: `'dd.mm.yyyy, HH:MM'`.
 */
export const formatTemplateDate = (calendar: CalendarSystem, date: string, template: string) => {
  const { year, month, day } = calendar.toFields(date.slice(0, 10))
  const [hours = 0, minutes = 0, seconds = 0] = date.slice(11).split(':').map(Number)
  const values = { y: year, m: month, d: day, H: hours, M: minutes, S: seconds }

  let result = template

  for (const { type, start, end } of getTemplateSegments(template)) {
    const value = String(values[type]).padStart(end - start, '0').slice(start - end)
    result = result.slice(0, start) + value + result.slice(end)
  }

  return result
}
