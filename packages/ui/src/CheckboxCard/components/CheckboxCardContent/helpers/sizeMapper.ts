import { TextProps } from '../../../../Text';
import { CheckboxCardSize } from '../../../types.ts';

const mapperTextSize: Record<CheckboxCardSize, {
  title: TextProps['size'],
  description: TextProps['size']
}> = {
  'small': {
    title: 3,
    description: 2,
  },
  'medium': {
    title: 4,
    description: 3,
  },
  'large': {
    title: 5,
    description: 4,
  },
} as const;

export const sizeMapper = (type: CheckboxCardSize) => mapperTextSize?.[type] ?? {
  title: 4,
  description: 3,
}