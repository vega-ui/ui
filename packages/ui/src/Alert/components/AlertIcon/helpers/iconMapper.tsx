import { ReactElement } from 'react';
import { Info, CircleAlert, CircleCheck } from '@vega-ui/icons'
import { AlertVariant } from '../../../types.ts';

export const iconMapper: Record<AlertVariant, ReactElement> = {
  info: <Info />,
  warning: <CircleAlert />,
  error: <CircleAlert />,
  success: <CircleCheck />
} as const