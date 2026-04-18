import { IconSize } from '../../../../Icon';
import { SelectSize } from '../../../types';

const mapperTextSize: Record<SelectSize, IconSize> = {
  'xs': 'xs',
  'sm': 'xs',
  'md': 'sm',
  'lg': 'md',
  'xl': 'md',
} as const;

export const sizeMapper = (type: SelectSize) => mapperTextSize?.[type] ?? 'sm'