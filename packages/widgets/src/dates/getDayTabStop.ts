import { CalendarSystem, getCalendarMonthStart, isSameCalendarMonth } from '@vega-ui/i18n'
import { DateAvailability, isDateAvailable } from './isDateAvailable'
import { getAvailableDate } from './getAvailableDate'

export const getDayTabStop = (
  calendar: CalendarSystem,
  focused: string,
  candidates: (string | undefined)[],
  availability: DateAvailability,
) => {
  const preferred = [focused, ...candidates].find((date) => {
    if (date === undefined) return false

    return isSameCalendarMonth(calendar, date, focused) && isDateAvailable(date, availability)
  })

  return preferred ?? getAvailableDate(calendar, getCalendarMonthStart(calendar, focused), availability)
}
