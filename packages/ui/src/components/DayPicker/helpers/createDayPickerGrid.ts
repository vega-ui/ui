export interface DayPickerGridCell {
  /** Column index of the cell within the week (0–6). */
  col: number;
  
  /**
   * Day number (1–31). May be `undefined` if the cell is outside the
   * current month and overflow days are not included.
   */
  day: number | undefined;
  
  /** Month index (0–11) the cell belongs to. */
  month: number;
  
  /** Full year for this cell. */
  year: number;
  
  /** Whether this day belongs to the currently rendered month. */
  inCurrentMonth: boolean;
}

export interface DayPickerGridRow {
  /** Logical index of the row within the generated grid. */
  row: number;
  
  /** Array of cells for this row. */
  data: DayPickerGridCell[];
}

export interface DayPickerGridOptions {
  /** Base year. Defaults to the current year. */
  year?: number;
  
  /** Base month index (0–11). Defaults to the current month. */
  month?: number;
  
  /**
   * Logical month offset relative to (year, month).
   * For example: offset = +1 → next month, offset = -1 → previous month.
   * @default 0
   */
  offset?: number;
  
  /** Number of rows in the grid. Usually 5 or 6. @default 6 */
  rows?: number;
  
  /** Number of columns. Typically 7. @default 7 */
  cols?: number;
  
  /**
   * Whether to include days from the previous and next months to fill
   * all grid cells. If false, overflow cells contain undefined days.
   * @default false
   */
  includeOverflowDays?: boolean;
  
  /**
   * Defines the first day of the week.
   * 0 = Sunday, 1 = Monday, … 6 = Saturday.
   * @default 1 (Monday)
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Generates a complete calendar grid for a given month.
 *
 * Supports:
 * - month shifting via `offset`
 * - overflow day rendering (previous/next month)
 * - custom week start (e.g., Monday vs Sunday)
 * - fully custom grid sizes (rows × cols)
 *
 * Returns a matrix of DayPickerGridRow objects, each containing
 * visible or overflow days, month/year info, and flags indicating
 * whether a cell belongs to the current month.
 *
 * @example
 * // Generate the UI matrix for April 2025
 * createDayPickerGrid({ year: 2025, month: 3 });
 *
 * @example
 * // Sunday-based week layout with overflow days
 * createDayPickerGrid({
 *   year: 2025,
 *   month: 0,
 *   weekStartsOn: 0,
 *   includeOverflowDays: true,
 * });
 */
export const createDayPickerGrid = (
  options: DayPickerGridOptions = {}
): DayPickerGridRow[] => {
  const {
    year = new Date().getFullYear(),
    month = new Date().getMonth(),
    offset = 0,
    rows = 6,
    cols = 7,
    includeOverflowDays = false,
    weekStartsOn = 1,
  } = options;
  
  const baseDate = new Date(year, month + offset, 1);
  const gridYear = baseDate.getFullYear();
  const gridMonth = baseDate.getMonth();
  
  const firstWeekday = baseDate.getDay();
  
  const startOffset = ((firstWeekday - weekStartsOn) + 7) % 7;
  
  const daysInMonth = new Date(gridYear, gridMonth + 1, 0).getDate();
  
  let prevYear = gridYear;
  let prevMonth = gridMonth;
  let prevMonthDays = 0;
  let nextYear = gridYear;
  let nextMonth = gridMonth;
  
  if (includeOverflowDays) {
    const prevMonthDate = new Date(gridYear, gridMonth, 0);
    prevYear = prevMonthDate.getFullYear();
    prevMonth = prevMonthDate.getMonth();
    prevMonthDays = prevMonthDate.getDate();
    
    const nextMonthDate = new Date(gridYear, gridMonth + 1, 1);
    nextYear = nextMonthDate.getFullYear();
    nextMonth = nextMonthDate.getMonth();
  }
  
  return Array.from({ length: rows }, (_, rowIndex) => {
    const data: DayPickerGridCell[] = Array.from({ length: cols }, (_, col) => {
      const cellIndex = rowIndex * cols + col;
      const dayNumber = cellIndex - startOffset + 1;
      
      if (dayNumber >= 1 && dayNumber <= daysInMonth) {
        return {
          col,
          day: dayNumber,
          month: gridMonth,
          year: gridYear,
          inCurrentMonth: true,
        };
      }
      
      if (!includeOverflowDays) {
        return {
          col,
          day: undefined,
          month: gridMonth,
          year: gridYear,
          inCurrentMonth: false,
        };
      }
      
      if (dayNumber < 1) {
        return {
          col,
          day: prevMonthDays + dayNumber,
          month: prevMonth,
          year: prevYear,
          inCurrentMonth: false,
        };
      }
      
      return {
        col,
        day: dayNumber - daysInMonth,
        month: nextMonth,
        year: nextYear,
        inCurrentMonth: false,
      };
    });
    
    return {
      row: rowIndex + offset * rows,
      data,
    };
  });
};
