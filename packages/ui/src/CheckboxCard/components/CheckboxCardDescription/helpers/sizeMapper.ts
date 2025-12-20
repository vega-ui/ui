import { CheckboxCardSize } from '../../../types.ts';
import { TextSize } from '../../../../Text/types.ts';

const mapperTextSize: Record<CheckboxCardSize, TextSize> = {
  sm: 2,
  md: 3,
  lg: 4,
} as const;

export const sizeMapper = (type: CheckboxCardSize) => mapperTextSize?.[type] ?? 4