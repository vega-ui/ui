'use client';

import { createContext } from '../../../internals/context';
import { AlertVariant } from '../../types';

export interface AlertContextState {
  variant: AlertVariant
}

export const [AlertProvider, useAlertContext] = createContext<AlertContextState>('AlertContext', {
  variant: 'info'
})