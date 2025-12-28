import { SelectSize } from '../../../types';
import { TextSize } from '../../../../Text/types';

export const sizeMapper = (size: SelectSize): TextSize => {
  return {
    sm: 2,
    md: 3,
    lg: 4,
  }[size] as TextSize ?? 3
}