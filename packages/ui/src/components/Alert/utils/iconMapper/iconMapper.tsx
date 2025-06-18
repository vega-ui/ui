import { AlertProps } from '../../Alert.tsx';
import { ReactElement } from 'react';
import { Info, CircleAlert, CircleCheck } from '@vega-ui/icons'

export const iconMapper: Record<Exclude<AlertProps['variant'], undefined>, ReactElement> = {
  info: <Info />,
  warning: <CircleAlert />,
  error: <CircleAlert />,
  success: <CircleCheck />
} as const