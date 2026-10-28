import { CheckboxCardSize } from '../../../types';
import { TextSize } from '../../../../Text';

const mapperTextSize: Record<CheckboxCardSize, TextSize> = {
  'sm': 3,
  'md': 4,
  'lg': 5,
} as const;

export const sizeMapper = (type: CheckboxCardSize) => mapperTextSize?.[type] ?? 4