import { TextProps } from '../../../Text';

type SizeMapperType = 'small' | 'medium' | 'large';

const mapperTextSize: Record<SizeMapperType, TextProps['size']> = {
  'small': 1,
  'medium': 2,
  'large': 3,
} as const;

export const sizeMapper = (type: SizeMapperType) => mapperTextSize[type]