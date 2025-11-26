interface MonthPickerGridOptions {
  /**
   * Number of grid rows.
   * @default 3
   */
  rows?: number;
  
  /**
   * Number of grid columns.
   * @default 4
   */
  cols?: number;
  
  /**
   * Starting month index (0 = January).
   * Defines the top-left month of the generated grid.
   *
   * @default 0
   */
  start?: number;
}

/**
 * Generates a 2D matrix of months for use in MonthPicker layouts.
 *
 * The grid is filled row-by-row, starting from `start`.
 * For example, with rows=3, cols=4 and start=0:
 * grid → 0..3 / 4..7 / 8..11 (January–December).
 *
 * @param options Configuration controlling grid size and start offset.
 * @returns Array of row objects containing month cell metadata.
 *
 * @example
 * createMonthPickerGrid({ rows: 2, cols: 3, start: 6 })
 * // →
 * // [
 * //   { row: 0, data: [ {month:6}, {month:7}, {month:8} ] },
 * //   { row: 1, data: [ {month:9}, {month:10}, {month:11} ] }
 * // ]
 */
export const createMonthPickerGrid = (options?: MonthPickerGridOptions) => {
  const { rows = 3, cols = 4, start = 0 } = options ?? {}
  
  return (
    Array.from({ length: rows }, (_, row) => ({
      row: row,
      data: Array.from({ length: cols }, (_, col) => ({
        col: col,
        month: start + col + row * cols,
      }))
    }))
  )
}