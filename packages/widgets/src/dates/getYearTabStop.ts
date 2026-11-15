import { addCalendarYears, CalendarSystem, getCalendarYearStart } from '@vega-ui/i18n';
import { clampDate } from './clampDate';
import { DateAvailability, isDateAvailable } from './isDateAvailable';

const SEARCH_LIMIT = 100

export const getYearTabStop = (
  calendar: CalendarSystem,
  focused: string,
  candidates: (string | undefined)[],
  availability: DateAvailability,
) => {
  const preferred = [focused, ...candidates]
    .filter((date) => date !== undefined)
    .map((date) => getCalendarYearStart(calendar, date))
    .find((year) => isDateAvailable(year, availability))

  if (preferred !== undefined) return preferred

  let year = getCalendarYearStart(calendar, clampDate(focused, availability.from, availability.to))

  for (let count = 0; count < SEARCH_LIMIT; count++) {
    if (isDateAvailable(year, availability)) return year

    year = addCalendarYears(calendar, year, 1)
  }

  return undefined
}
