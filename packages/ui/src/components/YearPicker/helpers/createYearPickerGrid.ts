interface YearPickerGridOptions {
  /**
   * Number of grid rows.
   * @default 3
   */
  rows?: number;
  
  /**
   * Number of grid columns.
   * @default 3
   */
  cols?: number;
  
  /**
   * Starting year of the grid.
   * Determines the first year in the base (offset=0) page.
   *
   * @default new Date().getFullYear()
   */
  start?: number;
  
  /**
   * Page offset relative to the starting year.
   * Each offset shifts the grid by `rows * cols` years.
   *
   * - `0` → base page
   * - `1` → next block of years
   * - `-1` → previous block of years
   *
   * @default 0
   */
  offset?: number;
}

/**
 * Creates a two-dimensional grid of years for use in the YearPicker.
 *
 * The grid size is defined by `rows × cols`, and each page of the picker
 * corresponds to a continuous block of years. The `offset` value shifts the
 * block forward or backward relative to the `start` year, making this function
 * suitable for paginated or infinite-scrolling year pickers.
 *
 * @example
 * // 3×3 grid starting from 2025
 * createYearPickerGrid({ start: 2025, rows: 3, cols: 3 })
 * // → [[2025, 2026, 2027], [2028, 2029, 2030], [2031, 2032, 2033]]
 *
 * @example
 * // Next block of years (offset = 1)
 * createYearPickerGrid({ start: 2025, rows: 3, cols: 3, offset: 1 })
 * // → [[2034, 2035, 2036], ...]
 *
 * @param options - Grid configuration
 * @returns Array of rows, each containing year cell metadata
 */
export const createYearPickerGrid = (options?: YearPickerGridOptions) => {
  const { rows = 3, cols = 3, offset = 0, start = new Date().getFullYear() } = options ?? {}
  const size = rows * cols;
  const startShift = start + (offset * size)
  
  return (
    Array.from({ length: rows }, (_, row) => ({
      row: row + (offset * rows),
      data: Array.from({ length: cols }, (_, col) => ({
        col: col,
        year: startShift + (cols * row) + col,
      }))
    }))
  )
}