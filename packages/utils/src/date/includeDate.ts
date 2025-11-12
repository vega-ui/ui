import { isEqualDates } from './isEqualDates';

export const includeDate = (dates: Date[], date: Date) => {
  for (let i = 0; i <= dates.length - 1; i++) {
    if (isEqualDates(dates[i], date)) return true
  }
  
  return false
}