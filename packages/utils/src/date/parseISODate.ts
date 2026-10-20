import { createValidDate } from './createValidDate'

const ISO_DATE = /^(\d{4,})-(\d{2})-(\d{2})$/

/**
 * Parses a `YYYY-MM-DD` string into a local date at midnight.
 * Returns `undefined` for a missing, malformed or non-existent date
 * (e.g. `2025-02-31`), like a native `<input type="date">` sanitizes it
 * to an empty value.
 */
export const parseISODate = (value?: string): Date | undefined => {
  const match = ISO_DATE.exec(value ?? '')
  if (!match) return undefined

  const [, year, month, day] = match.map(Number)
  return createValidDate(year, month, day)
}
