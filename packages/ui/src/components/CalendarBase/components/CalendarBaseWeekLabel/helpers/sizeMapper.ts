import { BaseCalendarSize } from '../../../types.ts';
import { TextProps } from '../../../../Text';

export const sizeMapper = (size: BaseCalendarSize) => {
  return ({
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 5,
  } as Record<BaseCalendarSize, TextProps['size']>)[size]
}