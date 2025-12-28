import { CalendarBaseSize } from '../../../types';
import { TextProps } from '../../../../Text';

export const sizeMapper = (size: CalendarBaseSize) => {
  return ({
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 5,
  } as Record<CalendarBaseSize, TextProps['size']>)[size]
}