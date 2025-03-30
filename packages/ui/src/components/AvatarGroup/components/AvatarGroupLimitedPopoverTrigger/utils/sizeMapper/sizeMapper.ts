import { IconProps } from '../../../../../Icon';
import { AvatarGroupItemProps } from '../../../AvatarGroupItem';

type SizeMapperType = Exclude<AvatarGroupItemProps['size'], undefined>;

const mapperTextSize: Record<SizeMapperType, IconProps['size']> = {
  '2xs': '4xs',
  'xs': '3xs',
  'sm': '2xs',
  'md': '2xs',
  'lg': 'xs',
  'xl': 'xs',
  '2xl': 'sm',
} as const;

export const sizeMapper = (type: SizeMapperType) => mapperTextSize[type]