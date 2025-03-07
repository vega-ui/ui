import { TextProps } from '../../../../../Text';

const mapperTextSize: Record<'small' | 'medium' | 'large', {
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

export const sizeMapper = (type: 'small' | 'medium' | 'large') => mapperTextSize[type]