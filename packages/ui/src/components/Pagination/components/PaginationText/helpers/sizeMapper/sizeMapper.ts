import { TextProps } from '../../../../../Text';
import { PaginationSize } from '../../../../types.ts';

const mapperIconSize: Record<PaginationSize, TextProps['size']> = {
  'small': 2,
  'medium': 3,
  'large': 4,
} as const;

export const sizeMapper = (type: PaginationSize) => mapperIconSize?.[type] ?? 3