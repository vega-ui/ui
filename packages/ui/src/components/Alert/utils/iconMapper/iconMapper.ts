import { IconProps } from '../../../Icon';
import { AlertProps } from '../../Alert.tsx';

export const iconMapper: Record<Exclude<AlertProps['variant'], undefined>, IconProps['name']> = {
  info: 'info',
  warning: 'danger',
  error: 'danger',
  success: 'checkCircle'
} as const