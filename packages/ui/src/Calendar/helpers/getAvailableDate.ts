import { isDisabledDate } from './isDisabledDate';
import { normalizeDate } from '@vega-ui/utils';
import { CalendarDatesDisabled } from '../types';

interface GetAvailableDateOptions {
  from?: Date;
  to?: Date;
  disabled?: CalendarDatesDisabled;
}

export const getAvailableDate = (date: Date, { from, to, disabled }: GetAvailableDateOptions): Date | null => {
  let d = normalizeDate(date)
  
  if (from && d < normalizeDate(from)) d = normalizeDate(from)
  if (to && d > normalizeDate(to)) d = normalizeDate(to)
  
  if (!isDisabledDate(d.getTime(), disabled ?? [])) return d
  
  const month = d.getMonth()
  
  const forward = new Date(d)
  const backward = new Date(d)
  
  while (true) {
    forward.setDate(forward.getDate() + 1)
    if (forward.getMonth() === month) {
      if (!isDisabledDate(forward.getTime(), disabled ?? [])) return forward
    }
    
    backward.setDate(backward.getDate() - 1)
    if (backward.getMonth() === month) {
      if (!isDisabledDate(backward.getTime(), disabled ?? [])) return backward
    }
    
    if (forward.getMonth() !== month && backward.getMonth() !== month) break
  }
  
  return null
}