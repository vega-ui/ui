export interface GetMonthWeeksOptions {
  /** 0 = Sunday, 1 = Monday */
  firstDayOfWeek?: 0 | 1
  /** Show adjacent month days only on the first and last week */
  includeAdjacentEdgeDays?: boolean
}

/**
 * Returns an array of weeks for the given month (0–11),
 * each week is an array of 7 Date or null values.
 */
export const getMonthWeeks = (
  year: number,
  month: number,
  options: GetMonthWeeksOptions = {}
): (Date | null)[][] => {
  const { firstDayOfWeek = 1, includeAdjacentEdgeDays = true } = options
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  // Calculate where the first visible day starts
  const offsetStart = (firstDay.getDay() - firstDayOfWeek + 7) % 7
  const gridStart = new Date(firstDay)
  gridStart.setDate(firstDay.getDate() - offsetStart)
  
  // Calculate where the last visible day ends
  const offsetEnd = (firstDayOfWeek + 6 - lastDay.getDay() + 7) % 7
  const gridEnd = new Date(lastDay)
  gridEnd.setDate(lastDay.getDate() + offsetEnd)
  
  const allDays: Date[] = []
  const cursor = new Date(gridStart)
  
  while (cursor <= gridEnd) {
    allDays.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }
  
  // Split into weeks
  const weeks: (Date | null)[][] = []
  for (let i = 0; i < allDays.length; i += 7) {
    const week = allDays.slice(i, i + 7)
    
    if (!includeAdjacentEdgeDays) {
      const isFirst = i === 0
      const isLast = i + 7 >= allDays.length
      weeks.push(
        week.map(d =>
          (isFirst || isLast) && d.getMonth() !== month ? null : d
        )
      )
    } else {
      weeks.push(week)
    }
  }
  
  return weeks
}
