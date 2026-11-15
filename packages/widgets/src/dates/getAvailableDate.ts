import { addISODays, CalendarSystem, isSameCalendarMonth } from '@vega-ui/i18n'
import { clampDate } from './clampDate'
import { DateAvailability, isDateAvailable } from './isDateAvailable'

export const getAvailableDate = (calendar: CalendarSystem, date: string, availability: DateAvailability): string | undefined => {
  const day = clampDate(date, availability.from, availability.to)
  if (!isSameCalendarMonth(calendar, day, date)) return undefined
  if (isDateAvailable(day, availability)) return day

  for (let distance = 1; ; distance++) {
    const forward = addISODays(day, distance)
    const backward = addISODays(day, -distance)

    const forwardInMonth = isSameCalendarMonth(calendar, forward, day)
    const backwardInMonth = isSameCalendarMonth(calendar, backward, day)

    if (forwardInMonth && isDateAvailable(forward, availability)) return forward
    if (backwardInMonth && isDateAvailable(backward, availability)) return backward
    if (!forwardInMonth && !backwardInMonth) return undefined
  }
}
