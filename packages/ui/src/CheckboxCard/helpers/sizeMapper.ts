import { CheckboxProps } from '../../Checkbox';
import { CheckboxCardSize } from '../types.ts';

const mapperCheckboxSize: Record<CheckboxCardSize, CheckboxProps['size']> = {
  'small': 'medium',
  'medium': 'large',
  'large': 'large',
} as const;

export const sizeMapper = (type: CheckboxCardSize) => {
  const size = mapperCheckboxSize?.[type]
  
  return size ?? 'medium'
}