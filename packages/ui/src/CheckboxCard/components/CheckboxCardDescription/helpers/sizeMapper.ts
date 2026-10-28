import { CheckboxCardSize } from '../../../types';
import { TextSize } from '../../../../Text';

const mapperTextSize: Record<CheckboxCardSize, TextSize> = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
} as const;

export const sizeMapper = (type: CheckboxCardSize) => mapperTextSize?.[type] ?? 4