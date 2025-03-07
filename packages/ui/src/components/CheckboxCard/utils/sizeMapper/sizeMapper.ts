import { CheckboxProps } from '../../../Checkbox';

const mapperCheckboxSize: Record<'small' | 'medium' | 'large', CheckboxProps['size']> = {
  'small': 'medium',
  'medium': 'large',
  'large': 'large',
} as const;

export const sizeMapper = (type: 'small' | 'medium' | 'large') => mapperCheckboxSize[type]