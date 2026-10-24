import { TimeSegmentType } from './getTemplateSegments'

/**
 * Smallest and largest value of the hours, minutes or seconds segment.
 */
export const getTimeSegmentRange = (type: TimeSegmentType): [min: number, max: number] => {
  if (type === 'H') return [0, 23]
  return [0, 59]
}
