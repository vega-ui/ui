type SizeMapperType = 'small' | 'medium' | 'large';

const mapperIconSize: Record<SizeMapperType, 'small' | 'medium' | 'large'> = {
  'small': 'small',
  'medium': 'medium',
  'large': 'large',
} as const;

export const sizeMapper = (type: SizeMapperType) => mapperIconSize[type]