import { IconSize } from '../../../../Icon';
import { SelectSize } from '../../../types';

const mapperTextSize: Record<SelectSize, IconSize> = {
  'sm': 'xs',
  'md': 'sm',
  'lg': 'md',
} as const;

export const sizeMapper = (type: SelectSize) => mapperTextSize?.[type] ?? 'sm'