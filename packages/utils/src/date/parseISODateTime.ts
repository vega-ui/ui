import { createValidDate } from './createValidDate'

const ISO_DATE_TIME = /^(\d{4,})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/

/**
 * Parses a `YYYY-MM-DDTHH:mm` or `YYYY-MM-DDTHH:mm:ss` string into a local date.
 * Returns `undefined` for a missing, malformed or non-existent value.
 */
export const parseISODateTime = (value?: string): Date | undefined => {
  const match = ISO_DATE_TIME.exec(value ?? '')
  if (!match) return undefined

  const [, year, month, day, hours, minutes, seconds] = match.map(part => Number(part ?? 0))
  return createValidDate(year, month, day, hours, minutes, seconds)
}
