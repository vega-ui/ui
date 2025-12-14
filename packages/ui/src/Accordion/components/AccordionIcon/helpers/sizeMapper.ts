import { AccordionSize } from '../../../types.ts';
import { IconSize } from '../../../../Icon';

const mapperHeadingSize: Record<AccordionSize, IconSize> = {
  'small': 'sm',
  'medium': 'md',
  'large': 'lg',
} as const;

export const sizeMapper = (type: AccordionSize) => mapperHeadingSize?.[type] ?? 'sm'