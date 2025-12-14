import { IconProps } from '../../../../Icon';
import { AvatarGroupItemProps } from '../../AvatarGroupItem';

type SizeMapperType = Exclude<AvatarGroupItemProps['size'], undefined>;

const mapperTextSize: Record<SizeMapperType, IconProps['size']> = {
  '2xs': '3xs',
  'xs': '2xs',
  'sm': 'xs',
  'md': 'sm',
  'lg': 'md',
  'xl': 'lg',
  '2xl': 'xl',
} as const;

export const sizeMapper = (type: SizeMapperType) => mapperTextSize?.[type] ?? 'sm'