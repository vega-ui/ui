import { TextProps } from '../../../../Text';
import { PaginationSize } from '../../../types.ts';

const mapperIconSize: Record<PaginationSize, TextProps['size']> = {
  'xs': 2,
  'sm': 2,
  'md': 3,
  'lg': 4,
  'xl': 4,
} as const;

export const sizeMapper = (type: PaginationSize) => mapperIconSize?.[type] ?? 3