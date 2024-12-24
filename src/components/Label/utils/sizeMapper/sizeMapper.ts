import { TextProps } from '../../../Text';

type SizeMapperType = 'small' | 'medium' | 'large';

const mapperTextSize: Record<SizeMapperType, TextProps['size']> = {
  'small': 2,
  'medium': 3,
  'large': 4,
} as const;

export const sizeMapper = (type: SizeMapperType) => mapperTextSize[type]