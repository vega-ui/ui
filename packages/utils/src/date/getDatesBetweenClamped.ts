import { inDatesRange } from './inDatesRange';
import { isEqualDates } from './isEqualDates';

interface GetDatesBetweenClampedOptions {
  min?: Date
  max?: Date
  exclude?: Array<Date | [Date, Date]>
}

const isExcluded = (date: Date, exclude: Array<Date | [Date, Date]>) => {
  for (let i = 0; i < exclude.length; i++) {
    const excluded = exclude[i]
    if (Array.isArray(excluded) ? inDatesRange(excluded, date) : isEqualDates(excluded, date)) return true
  }
  
  return false
}

export const getDatesBetweenClamped = (
  start: Date,
  end: Date,
  options?: GetDatesBetweenClampedOptions
): Date[] => {
  const { min = start, max = end, exclude = [] } = options ?? {}
  
  if (!start || !end) return []
  
  const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate())
  
  if (startDate > endDate) {
    return getDatesBetweenClamped(endDate, startDate, options)
  }
  
  const from = startDate < min ? min : startDate
  const to = endDate > max ? max : endDate
  
  const dates: Date[] = []
  const current = new Date(from)
  
  while (current <= to) {
    const d = new Date(current)
    
    if (!isExcluded(d, exclude)) dates.push(d)
    current.setDate(current.getDate() + 1)
  }
  
  return dates
}
