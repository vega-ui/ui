import { CheckboxCardSize } from '../../../types';
import { CheckboxSize } from '../../../../Checkbox';

const mapperCheckboxSize: Record<CheckboxCardSize, CheckboxSize> = {
  'xs': 'sm',
  'sm': 'md',
  'md': 'md',
  'lg': 'lg',
  'xl': 'xl',
} as const;

export const sizeMapper = (type: CheckboxCardSize) => {
  return mapperCheckboxSize?.[type] ?? 'md'
}