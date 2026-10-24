import { padDatePart } from './padDatePart'

/**
 * Formats the UTC day of a date as an ISO `YYYY-MM-DD` string. Like
 * `<input type="date">`, only years 0001–9999 are supported; other years
 * throw a `RangeError`.
 */
export const utcToISODate = (date: Date) => {
  const year = date.getUTCFullYear()

  if (Number.isNaN(year) || year < 1 || year > 9999) {
    throw new RangeError(`Year ${year} is outside the supported range 0001–9999`)
  }

  return `${padDatePart(year, 4)}-${padDatePart(date.getUTCMonth() + 1)}-${padDatePart(date.getUTCDate())}`
}
