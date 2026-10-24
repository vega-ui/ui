import { CalendarSystem, getCalendarMonthStart, gregorianCalendar, addISODays, getISOWeekday, DAYS_IN_WEEK } from '@vega-ui/i18n';
import { formatISODate, getCurrentDate } from '@vega-ui/utils';

export interface DayPickerGridCell {
  /**
   * Column index within the row.
   */
  col: number;
  
  /**
   * The day as a `YYYY-MM-DD` string, or `undefined` for an empty overflow cell.
   */
  date: string | undefined;
  
  /**
   * Day number within its month in the calendar system, or `undefined` for an empty overflow cell.
   */
  day: number | undefined;
  
  /**
   * Whether the day belongs to the generated month.
   */
  inCurrentMonth: boolean;
}

export interface DayPickerGridRow {
  /**
   * Row index, shifted by `offset` pages.
   */
  row: number;
  
  data: DayPickerGridCell[];
}

export interface DayPickerGridOptions {
  /**
   * Month to generate, given as a `YYYY-MM-DD` string of any day in it.
   * Defaults to the current month.
   */
  month?: string;
  
  /**
   * Calendar system the month belongs to.
   * @default the Gregorian calendar
   */
  calendar?: CalendarSystem;
  
  /**
   * Number of rows to generate.
   * @default 6
   */
  rows?: number;
  
  /**
   * Page index; row indexes are shifted by `offset × rows`, so several grids
   * keep unique rows.
   * @default 0
   */
  offset?: number;
  
  /**
   * Whether to fill empty cells with days of the previous and next months.
   * @default false
   */
  includeOverflowDays?: boolean;
  
  /**
   * First day of the week. 0 = Sunday, 1 = Monday, … 6 = Saturday.
   * @default 1
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Generates the rows of a month grid in any calendar system.
 */
export const createDayPickerGrid = (
  options: DayPickerGridOptions = {}
): DayPickerGridRow[] => {
  const {
    month = formatISODate(getCurrentDate()),
    calendar = gregorianCalendar,
    rows = 6,
    offset = 0,
    includeOverflowDays = false,
    weekStartsOn = 1,
  } = options;
  
  const start = getCalendarMonthStart(calendar, month);
  const daysInMonth = calendar.getDaysInMonth(calendar.toFields(start));
  const startOffset = (getISOWeekday(start) - weekStartsOn + DAYS_IN_WEEK) % DAYS_IN_WEEK;
  
  return Array.from({ length: rows }, (_, rowIndex) => ({
    row: rowIndex + offset * rows,
    data: Array.from({ length: DAYS_IN_WEEK }, (_, col) => {
      const dayIndex = rowIndex * DAYS_IN_WEEK + col - startOffset;
      const inCurrentMonth = dayIndex >= 0 && dayIndex < daysInMonth;
      
      if (!inCurrentMonth && !includeOverflowDays) {
        return { col, date: undefined, day: undefined, inCurrentMonth };
      }
      
      const date = addISODays(start, dayIndex);
      
      return { col, date, day: calendar.toFields(date).day, inCurrentMonth };
    }),
  }));
};
