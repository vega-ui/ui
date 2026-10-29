import { getTemplateSegments } from './getTemplateSegments'

/**
 * Writes a `HH:mm` or `HH:mm:ss` time by a template of `HH`, `MM` and `SS`
 * segments (see `getTimeTemplate`). Missing seconds are written as zeros.
 */
export const formatTemplateTime = (time: string, template: string) => {
  const [hours = 0, minutes = 0, seconds = 0] = time.split(':').map(Number)
  const values: Record<string, number> = { H: hours, M: minutes, S: seconds }

  let result = template

  for (const { type, start, end } of getTemplateSegments(template)) {
    const value = String(values[type] ?? 0).padStart(end - start, '0')
    result = result.slice(0, start) + value + result.slice(end)
  }

  return result
}
