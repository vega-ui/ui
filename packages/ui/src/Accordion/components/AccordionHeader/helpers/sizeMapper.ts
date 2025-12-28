import { TextProps } from '../../../../Text';
import { AccordionSize } from '../../../types.ts';

const mapperHeadingSize: Record<AccordionSize, TextProps['size']> = {
  'sm': 3,
  'md': 4,
  'lg': 5,
} as const;

export const sizeMapper = (type: AccordionSize) => mapperHeadingSize?.[type] ?? 3