import { CalendarSystem, getCalendarMonthStart, getCalendarMonthsOfYear, getCalendarYearStart } from '@vega-ui/i18n';
import { DateAvailability, isDateAvailable } from './isDateAvailable';

export const getMonthTabStop = (
  calendar: CalendarSystem,
  focused: string,
  candidates: (string | undefined)[],
  availability: DateAvailability,
) => {
  const year = getCalendarYearStart(calendar, focused)
  const preferred = [focused, ...candidates]
    .filter((date) => date !== undefined)
    .map((date) => getCalendarMonthStart(calendar, date))
    .find((month) => getCalendarYearStart(calendar, month) === year && isDateAvailable(month, availability))

  if (preferred !== undefined) return preferred

  return getCalendarMonthsOfYear(calendar, year).find((month) => isDateAvailable(month, availability))
}
