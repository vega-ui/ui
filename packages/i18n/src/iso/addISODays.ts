import { isoDateToUTC } from './isoDateToUTC'
import { utcToISODate } from './utcToISODate'

/**
 * Adds a number of days to an ISO `YYYY-MM-DD` day. Independent of any
 * calendar system and of time zones.
 */
export const addISODays = (date: string, days: number) => {
  const utc = isoDateToUTC(date)
  utc.setUTCDate(utc.getUTCDate() + days)

  return utcToISODate(utc)
}
