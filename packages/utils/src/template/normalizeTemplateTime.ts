import { gregorianCalendar } from '@vega-ui/i18n'
import { normalizeTemplateDate } from './normalizeTemplateDate'
import { parseTemplateTime } from './parseTemplateTime'
import { formatTemplateTime } from './formatTemplateTime'

export interface NormalizeTemplateTimeOptions {
  /**
   * Earliest allowed time as a `HH:mm` or `HH:mm:ss` string.
   */
  min?: string

  /**
   * Latest allowed time as a `HH:mm` or `HH:mm:ss` string.
   */
  max?: string
}

/**
 * Corrects a time being typed by a template of `HH`, `MM` and `SS` segments
 * (see `getTimeTemplate`) like `normalizeTemplateDate` does for dates:
 * complete segments are clamped to their range, a single digit that cannot
 * start a segment is padded with a zero, and a complete time is clamped to
 * `min` and `max`.
 */
export const normalizeTemplateTime = (text: string, template: string, bounds: NormalizeTemplateTimeOptions = {}) => {
  const result = normalizeTemplateDate(gregorianCalendar, text, template)
  const time = parseTemplateTime(result, template)

  if (time && bounds.min && time < bounds.min) return formatTemplateTime(bounds.min, template)
  if (time && bounds.max && time > bounds.max) return formatTemplateTime(bounds.max, template)

  return result
}
