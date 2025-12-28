import { CalendarDatesDisabled } from '../types';
import { isDisabledDate } from './isDisabledDate';
import { normalizeDate } from '@vega-ui/utils';

interface GetFirstDayInMonthOptions {
  year: number;
  month: number;
  from?: Date;
  to?: Date;
  disabled?: CalendarDatesDisabled;
}

export const getFirstDayInMonth = ({ year, month, from, to, disabled }: GetFirstDayInMonthOptions): Date | null => {
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);
  
  let start = normalizeDate(firstOfMonth);
  let end = normalizeDate(lastOfMonth);
  
  if (from) {
    const nf = normalizeDate(from);
    if (nf > start) start = nf;
  }
  
  if (to) {
    const nt = normalizeDate(to);
    if (nt < end) end = nt;
  }
  
  if (start > end) return null;
  
  for (let d = new Date(start.getTime()); d <= end; d.setDate(d.getDate() + 1)) {
    const current = normalizeDate(d);
    if (!isDisabledDate(current.getTime(), disabled)) {
      return current;
    }
  }
  
  return null;
};