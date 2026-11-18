import { IconSize } from '../../../../Icon';
import { MenuSize } from '../../../types';

const mapperIconSize: Record<MenuSize, IconSize> = {
  'xs': 'xs',
  'sm': 'xs',
  'md': 'sm',
  'lg': 'md',
  'xl': 'md',
} as const;

export const sizeMapper = (size: MenuSize) => mapperIconSize[size] ?? 'sm'
