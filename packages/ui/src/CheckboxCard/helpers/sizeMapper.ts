import { CheckboxSize } from '../../Checkbox';
import { CheckboxCardSize } from '../types.ts';

const mapperCheckboxSize: Record<CheckboxCardSize, CheckboxSize> = {
  'small': 'md',
  'medium': 'lg',
  'large': 'lg',
} as const;

export const sizeMapper = (type: CheckboxCardSize) => {
  const size = mapperCheckboxSize?.[type]
  
  return size ?? 'md'
}