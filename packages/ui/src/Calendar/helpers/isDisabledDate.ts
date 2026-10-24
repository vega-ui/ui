import { CalendarDatesDisabled } from '../types';

export const isDisabledDate = (date: string, disabled: CalendarDatesDisabled) => {
  if (Array.isArray(disabled)) return disabled.includes(date)
  if (typeof disabled === 'function') return disabled(date)
  
  return disabled === date
}
