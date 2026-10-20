import { padDatePart } from './padDatePart'

/**
 * Formats a date as a `YYYY-MM-DD` string — the value format of a native
 * `<input type="date">`. Uses the local calendar date, not UTC.
 * A missing date formats as an empty string, the native empty value.
 */
export const formatISODate = (date?: Date): string =>
  date ? `${padDatePart(date.getFullYear(), 4)}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}` : ''
