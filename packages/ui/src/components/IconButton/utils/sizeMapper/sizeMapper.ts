import { IconProps } from '../../../Icon';

type SizeMapperType = 'small' | 'medium' | 'large';

const mapperIconSize: Record<SizeMapperType, IconProps['size']> = {
  'small': 'mini',
  'medium': 'small',
  'large': 'medium',
} as const;

export const sizeMapper = (type: SizeMapperType) => mapperIconSize[type]