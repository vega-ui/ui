import { TextProps } from '../../Text';
import { HelperTextSize } from '../types.ts';

const mapperTextSize: Record<HelperTextSize, TextProps['size']> = {
  'sm': 1,
  'md': 2,
  'lg': 3,
} as const;

export const sizeMapper = (type: HelperTextSize) => {
  return mapperTextSize?.[type] ?? 2
}