import { CalendarSystem } from '@vega-ui/i18n'
import { formatTemplateDate } from './formatTemplateDate'

/**
 * Writes a `[start, end]` tuple of `YYYY-MM-DD` strings as two dates by a
 * template joined by `separator`. Without an end only the start is written;
 * without a start the text is empty.
 */
export const formatTemplateRange = (
  calendar: CalendarSystem,
  [start, end]: [start: string, end: string],
  template: string,
  separator: string
) => {
  if (!start) return ''

  const startText = formatTemplateDate(calendar, start, template)
  if (!end) return startText

  return `${startText}${separator}${formatTemplateDate(calendar, end, template)}`
}
