import { isoDateToUTC } from './isoDateToUTC'

/**
 * Day of the week of an ISO `YYYY-MM-DD` day, `0` for Sunday to `6` for Saturday.
 * The week is the same in every calendar system.
 */
export const getISOWeekday = (date: string) => isoDateToUTC(date).getUTCDay()
