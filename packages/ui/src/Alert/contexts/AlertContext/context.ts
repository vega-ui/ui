'use client';

import { createContext } from '@vega-ui/react-context';
import { AlertVariant } from '../../types.ts';

export interface AlertContextState {
  variant: AlertVariant
}

export const [AlertProvider, useAlertContext] = createContext<AlertContextState>('AlertContext', {
  variant: 'info'
})