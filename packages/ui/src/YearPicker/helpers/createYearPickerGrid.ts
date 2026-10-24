import { addCalendarYears, CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { formatISODate, getCurrentDate } from '@vega-ui/utils';

interface YearPickerGridOptions {
  /**
   * Number of rows in a page.
   * @default 3
   */
  rows?: number;
  
  /**
   * Number of columns in a page.
   * @default 3
   */
  cols?: number;
  
  /**
   * First year of page `0`, given as a `YYYY-MM-DD` string of any day in it.
   * Defaults to the current year.
   */
  start?: string;
  
  /**
   * Page index; each page holds `rows × cols` consecutive years.
   * @default 0
   */
  offset?: number;
  
  /**
   * Calendar system defining the years.
   * @default the Gregorian calendar
   */
  calendar?: CalendarSystem;
}

/**
 * Generates a page of consecutive years, each keyed by the first day of the
 * year as a `YYYY-MM-DD` string.
 */
export const createYearPickerGrid = (options?: YearPickerGridOptions) => {
  const {
    rows = 3,
    cols = 3,
    offset = 0,
    start = formatISODate(getCurrentDate()),
    calendar = gregorianCalendar,
  } = options ?? {}
  
  let year = addCalendarYears(calendar, start, offset * rows * cols)
  
  return Array.from({ length: rows }, (_, row) => ({
    row: row + (offset * rows),
    data: Array.from({ length: cols }, (_, col) => {
      const cell = { col, year }
      year = addCalendarYears(calendar, year, 1)
      return cell
    }),
  }))
}
