import { TextProps } from '../../Text';
import { LabelSize } from '../types';


const mapperTextSize: Record<LabelSize, TextProps['size']> = {
  'sm': 2,
  'md': 3,
  'lg': 4,
} as const;

export const sizeMapper = (type: LabelSize) => mapperTextSize?.[type] ?? 3