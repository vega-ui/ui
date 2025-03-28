import { IconProps } from '../../../Icon';

type SizeMapperType = 'small' | 'medium' | 'large';

const mapperIconSize: Record<SizeMapperType, IconProps['size']> = {
  'small': 'xs',
  'medium': 'sm',
  'large': 'md',
} as const;

export const sizeMapper = (type: SizeMapperType) => mapperIconSize[type]