import { AvatarProps } from '../../../../../Avatar';
import { TextProps } from '../../../../../Text';

type SizeMapperType = Exclude<AvatarProps['size'], undefined>;

const mapperTextSize: Record<SizeMapperType, TextProps['size']> = {
  '2xs': 1,
  'xs': 2,
  'sm': 3,
  'md': 4,
  'lg': 5,
  'xl': 6,
  '2xl': 7,
} as const;

export const sizeMapper = (type: SizeMapperType) => mapperTextSize[type]