import { addISODays } from '@vega-ui/i18n'
import { DateAvailability, isDateAvailable } from './isDateAvailable'

const SEARCH_LIMIT = 400

export const findAvailableDate = (start: string, step: number, availability: DateAvailability, end?: string) => {
  let date = start

  for (let count = 0; count < SEARCH_LIMIT; count++) {
    if (availability.from && date < availability.from && step < 0) return undefined
    if (availability.to && date > availability.to && step > 0) return undefined
    if (end && (step > 0 ? date > end : date < end)) return undefined
    if (isDateAvailable(date, availability)) return date

    date = addISODays(date, step)
  }

  return undefined
}
