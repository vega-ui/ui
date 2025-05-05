import { AlertProps } from '../../Alert.tsx';
import { ReactElement } from 'react';
import { InfoIcon, DangerIcon, CheckOIcon } from '@adara-cs/icons'

export const iconMapper: Record<Exclude<AlertProps['variant'], undefined>, ReactElement> = {
  info: <InfoIcon />,
  warning: <DangerIcon />,
  error: <DangerIcon />,
  success: <CheckOIcon />
} as const