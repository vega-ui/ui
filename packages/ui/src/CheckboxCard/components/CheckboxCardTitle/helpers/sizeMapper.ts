import { CheckboxCardSize } from '../../../types';
import { TextSize } from '../../../../Text';

const mapperTextSize: Record<CheckboxCardSize, TextSize> = {
  'xs': 2,
  'sm': 3,
  'md': 4,
  'lg': 5,
  'xl': 6,
} as const;

export const sizeMapper = (type: CheckboxCardSize) => mapperTextSize?.[type] ?? 4