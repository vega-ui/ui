export type DateSegmentType = 'd' | 'm' | 'y'

export type TimeSegmentType = 'H' | 'M' | 'S'

export type TemplateSegmentType = DateSegmentType | TimeSegmentType

export interface TemplateSegment<T extends TemplateSegmentType = TemplateSegmentType> {
  type: T
  start: number
  end: number
}

/**
 * Segments of a template (see `formatTemplateDate`): runs of the same field
 * letter with their positions, in the order of the template.
 */
export const getTemplateSegments = (template: string): TemplateSegment[] =>
  Array.from(template.matchAll(/d+|m+|y+|H+|M+|S+/g), ({ 0: match, index }) => ({
    type: match[0] as TemplateSegmentType,
    start: index,
    end: index + match.length,
  }))
