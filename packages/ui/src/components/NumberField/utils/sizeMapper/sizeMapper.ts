import { IconProps } from '../../../Icon';

type SizeMapperType = 'small' | 'medium' | 'large';

const mapperIconSize: Record<SizeMapperType, IconProps['size']> = {
  'small': 'femto',
  'medium': 'pico',
  'large': 'nano',
} as const;

export const sizeMapper = (type: SizeMapperType) => mapperIconSize[type]