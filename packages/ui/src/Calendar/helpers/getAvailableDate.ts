import { CalendarSystem, isSameCalendarMonth, addISODays } from '@vega-ui/i18n';
import { isDisabledDate } from './isDisabledDate';
import { CalendarDatesDisabled } from '../types';

interface GetAvailableDateOptions {
  from?: string;
  to?: string;
  disabled?: CalendarDatesDisabled;
}

export const getAvailableDate = (
  calendar: CalendarSystem,
  date: string,
  { from, to, disabled = [] }: GetAvailableDateOptions
): string | undefined => {
  let day = date
  
  if (from && day < from) day = from
  if (to && day > to) day = to
  
  const isAvailable = (candidate: string) =>
    !isDisabledDate(candidate, disabled) && (!from || candidate >= from) && (!to || candidate <= to)
  
  if (isAvailable(day)) return day
  
  for (let distance = 1; ; distance++) {
    const forward = addISODays(day, distance)
    const backward = addISODays(day, -distance)
    
    const forwardInMonth = isSameCalendarMonth(calendar, forward, day)
    const backwardInMonth = isSameCalendarMonth(calendar, backward, day)
    
    if (forwardInMonth && isAvailable(forward)) return forward
    if (backwardInMonth && isAvailable(backward)) return backward
    if (!forwardInMonth && !backwardInMonth) return undefined
  }
}
