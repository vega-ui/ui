/**
 * UTC midnight of an ISO `YYYY-MM-DD` day, so the day can be handled with the
 * UTC methods of `Date` independently of the time zone.
 */
export const isoDateToUTC = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  const utc = new Date(Date.UTC(2000, month - 1, day))
  utc.setUTCFullYear(year)

  return utc
}
