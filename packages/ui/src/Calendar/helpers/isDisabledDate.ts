import { CalendarDatesDisabled } from '../types';
import { formatISODate } from '@vega-ui/utils';

export const isDisabledDate = (dayTime: number, disabled: CalendarDatesDisabled) => {
  const date = formatISODate(new Date(dayTime))
  
  if (Array.isArray(disabled)) return disabled.includes(date)
  if (typeof disabled === 'function') return disabled(date)
  
  return disabled === date
}
