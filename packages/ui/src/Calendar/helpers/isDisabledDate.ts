import { CalendarDatesDisabled } from '../types';
import { isEqualDates } from '@vega-ui/utils';

export const isDisabledDate = (dayTime: number, disabled?: CalendarDatesDisabled) => {
  if (!disabled) return false;
  
  const date = new Date(dayTime)
  if (Array.isArray(disabled)) return disabled.some(d => isEqualDates(d, date))
  if (typeof disabled === 'function') return disabled(date)
  
  return isEqualDates(date, disabled as Date)
}