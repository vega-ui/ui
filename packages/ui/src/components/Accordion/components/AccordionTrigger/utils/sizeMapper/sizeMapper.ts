import { TextProps } from '../../../../../Text';

type SizeMapperType = 'small' | 'medium' | 'large';

const mapperHeadingSize: Record<SizeMapperType, TextProps['size']> = {
  'small': 3,
  'medium': 4,
  'large': 5,
} as const;

export const sizeMapper = (type: SizeMapperType) => mapperHeadingSize[type]