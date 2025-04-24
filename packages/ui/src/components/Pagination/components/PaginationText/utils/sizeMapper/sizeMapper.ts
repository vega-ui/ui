import { TextProps } from '../../../../../Text';

type SizeMapperType = 'small' | 'medium' | 'large';

const mapperIconSize: Record<SizeMapperType, TextProps['size']> = {
  'small': 2,
  'medium': 3,
  'large': 4,
} as const;

export const sizeMapper = (type: SizeMapperType) => mapperIconSize[type]