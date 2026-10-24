import { TemplateSegmentType, TimeSegmentType } from './getTemplateSegments'

/**
 * Whether a template segment is the hours, minutes or seconds.
 */
export const isTimeSegmentType = (type: TemplateSegmentType): type is TimeSegmentType =>
  type === 'H' || type === 'M' || type === 'S'
