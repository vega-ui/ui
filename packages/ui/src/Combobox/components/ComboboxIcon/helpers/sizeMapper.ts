import { IconSize } from '../../../../Icon';
import { TextFieldSize } from '../../../../TextField';

const mapperTextSize: Record<TextFieldSize, IconSize> = {
  'xs': 'xs',
  'sm': 'xs',
  'md': 'sm',
  'lg': 'md',
  'xl': 'md',
} as const;

export const sizeMapper = (size: TextFieldSize) => mapperTextSize[size] ?? 'sm'
