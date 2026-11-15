import { CalendarSize } from '../types';
import { TextProps } from '../../Text';

export const getWeekdayTextSize = (size: CalendarSize) => {
  return ({
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 5,
  } as Record<CalendarSize, TextProps['size']>)[size]
}
