import { AlertProps } from '../../Alert.tsx';
import { ReactElement } from 'react';
import { InfoIcon, DangerIcon, CheckOIcon } from '@vega-ui/icons'

export const iconMapper: Record<Exclude<AlertProps['variant'], undefined>, ReactElement> = {
  info: <InfoIcon />,
  warning: <DangerIcon />,
  error: <DangerIcon />,
  success: <CheckOIcon />
} as const