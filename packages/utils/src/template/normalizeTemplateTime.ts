import { gregorianCalendar } from '@vega-ui/i18n'
import { normalizeTemplateDate } from './normalizeTemplateDate'

/**
 * Corrects a time being typed by a template of `HH`, `MM` and `SS` segments
 * (see `getTimeTemplate`) like `normalizeTemplateDate` does for dates:
 * complete segments are clamped to their range and a single digit that cannot
 * start a segment is padded with a zero.
 */
export const normalizeTemplateTime = (text: string, template: string) => normalizeTemplateDate(gregorianCalendar, text, template)
