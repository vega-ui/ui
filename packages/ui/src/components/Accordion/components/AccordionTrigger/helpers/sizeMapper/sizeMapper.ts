import { TextProps } from '../../../../../Text';
import { AccordionSize } from '../../../../types.ts';

const mapperHeadingSize: Record<AccordionSize, TextProps['size']> = {
  'small': 3,
  'medium': 4,
  'large': 5,
} as const;

export const sizeMapper = (type: AccordionSize) => mapperHeadingSize?.[type] ?? 3