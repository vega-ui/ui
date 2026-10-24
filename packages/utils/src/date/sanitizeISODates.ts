import { parseISODate } from './parseISODate'

/**
 * Keeps only existing `YYYY-MM-DD` dates: a single malformed date becomes
 * `null`, malformed dates in an array are dropped, `undefined` stays `undefined`.
 */
export const sanitizeISODates = (value: string | string[] | undefined) => {
  if (value === undefined) return undefined
  if (!Array.isArray(value)) return parseISODate(value) ? value : null

  return value.filter(date => parseISODate(date))
}
