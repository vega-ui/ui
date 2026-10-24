import { CalendarSystem, getCalendarMonthsOfYear, gregorianCalendar } from '@vega-ui/i18n';
import { formatISODate, getCurrentDate } from '@vega-ui/utils';

interface MonthPickerGridOptions {
  /**
   * Year to generate, given as a `YYYY-MM-DD` string of any day in it.
   * Defaults to the current year.
   */
  year?: string;
  
  /**
   * Calendar system defining the months of the year.
   * @default the Gregorian calendar
   */
  calendar?: CalendarSystem;
  
  /**
   * Number of columns; rows are added as needed for all months of the year.
   * @default 3
   */
  cols?: number;
}

/**
 * Generates rows of the months of a year, each keyed by the first day of
 * the month as a `YYYY-MM-DD` string.
 */
export const createMonthPickerGrid = (options?: MonthPickerGridOptions) => {
  const { year = formatISODate(getCurrentDate()), calendar = gregorianCalendar, cols = 3 } = options ?? {}
  const months = getCalendarMonthsOfYear(calendar, year)
  
  return Array.from({ length: Math.ceil(months.length / cols) }, (_, row) => ({
    row,
    data: months.slice(row * cols, row * cols + cols).map((month, col) => ({ col, month })),
  }))
}
