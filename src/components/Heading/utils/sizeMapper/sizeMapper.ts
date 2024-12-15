type SizeMapperType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const mapper: Record<SizeMapperType, number> = {
  'h1': 11,
  'h2': 10,
  'h3': 8,
  'h4': 6,
  'h5': 5,
  'h6': 4,
}

export const sizeMapper = (type: SizeMapperType) => mapper[type]