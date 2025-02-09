import { SpinnerProps } from '../../../Spinner';

type SizeMapperType = 'small' | 'medium' | 'large';

const mapperSpinnerSize: Record<SizeMapperType, SpinnerProps['size']> = {
  'small': 2,
  'medium': 3,
  'large': 4,
} as const;

export const sizeMapper = (type: SizeMapperType) => mapperSpinnerSize[type]