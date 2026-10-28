import { TextProps } from '../../Text';
import { HelperTextSize } from '../types';

const mapperTextSize: Record<HelperTextSize, TextProps['size']> = {
  'xs': 1,
  'sm': 1,
  'md': 2,
  'lg': 3,
  'xl': 4,
} as const;

export const sizeMapper = (type: HelperTextSize) => {
  return mapperTextSize?.[type] ?? 2
}