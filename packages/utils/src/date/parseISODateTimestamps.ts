import { parseISODate } from './parseISODate'

/**
 * Parses one or several `YYYY-MM-DD` strings into local-midnight timestamps.
 * A single malformed date becomes `null`; malformed dates in an array are
 * dropped. `undefined` stays `undefined`.
 */
export const parseISODateTimestamps = (value: string | string[] | undefined) => {
  if (value === undefined) return undefined
  if (!Array.isArray(value)) return parseISODate(value)?.getTime() ?? null

  return value.map(date => parseISODate(date)?.getTime()).filter(time => time !== undefined)
}
