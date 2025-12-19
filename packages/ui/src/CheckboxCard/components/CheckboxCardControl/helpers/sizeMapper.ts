import { CheckboxCardSize } from '../../../types';
import { CheckboxSize } from '../../../../Checkbox';

const mapperCheckboxSize: Record<CheckboxCardSize, CheckboxSize> = {
  'sm': 'md',
  'md': 'md',
  'lg': 'lg',
} as const;

export const sizeMapper = (type: CheckboxCardSize) => {
  return mapperCheckboxSize?.[type] ?? 'md'
}