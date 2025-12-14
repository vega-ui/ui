import { TextProps } from '../../Text';
import { HelperTextSize } from '../types.ts';

const mapperTextSize: Record<HelperTextSize, TextProps['size']> = {
  'small': 1,
  'medium': 2,
  'large': 3,
} as const;

export const sizeMapper = (type: HelperTextSize) => {
  return mapperTextSize?.[type] ?? 2
}