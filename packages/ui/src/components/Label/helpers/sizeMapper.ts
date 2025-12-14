import { TextProps } from '../../Text';
import { LabelSize } from '../types.ts';


const mapperTextSize: Record<LabelSize, TextProps['size']> = {
  'small': 2,
  'medium': 3,
  'large': 4,
} as const;

export const sizeMapper = (type: LabelSize) => mapperTextSize?.[type] ?? 3