import { formatISODate } from './formatISODate'
import { padDatePart } from './padDatePart'

/**
 * Formats a date as a `YYYY-MM-DDTHH:mm` string — the value format of a native
 * `<input type="datetime-local">`. Seconds are appended only when non-zero.
 * A missing date formats as an empty string, the native empty value.
 */
export const formatISODateTime = (date?: Date): string => {
  if (!date) return ''

  const time = `${padDatePart(date.getHours())}:${padDatePart(date.getMinutes())}`
  const seconds = date.getSeconds() ? `:${padDatePart(date.getSeconds())}` : ''

  return `${formatISODate(date)}T${time}${seconds}`
}
