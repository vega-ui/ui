import { TextProps } from '../../../../Text';
import { AccordionSize } from '../../../types';

const mapperHeadingSize: Record<AccordionSize, TextProps['size']> = {
  'xs': 2,
  'sm': 3,
  'md': 4,
  'lg': 5,
  'xl': 6,
} as const;

export const sizeMapper = (type: AccordionSize) => mapperHeadingSize?.[type] ?? 3