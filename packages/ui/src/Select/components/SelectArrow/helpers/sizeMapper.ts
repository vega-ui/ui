import { IconProps } from '../../../../Icon';
import { SelectSize } from '../../../types.ts';

const mapperTextSize: Record<SelectSize, IconProps['size']> = {
  'small': 'xs',
  'medium': 'sm',
  'large': 'md',
} as const;

export const sizeMapper = (type: SelectSize) => mapperTextSize?.[type] ?? 'sm'