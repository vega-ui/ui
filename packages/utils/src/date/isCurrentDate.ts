import { isEqualDates } from './isEqualDates';
import { getCurrentDate } from './getCurrentDate';

export const isCurrentDate = (date: Date | null) => {
  if (!date) return false
  return isEqualDates(date, getCurrentDate())
}