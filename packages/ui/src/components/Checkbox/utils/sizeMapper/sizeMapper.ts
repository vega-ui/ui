import { IconProps } from '../../../Icon';

type SizeMapperType = 'small' | 'medium' | 'large';

const mapperIconSize: Record<SizeMapperType, IconProps['size']> = {
  'small': '4xs',
  'medium': '3xs',
  'large': '2xs',
} as const;

export const sizeMapper = (type: SizeMapperType) => mapperIconSize[type]