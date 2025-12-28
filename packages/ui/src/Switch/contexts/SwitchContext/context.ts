'use client';

import { createContext } from '@vega-ui/react-context';
import { SwitchSize, SwitchVariant } from '../../types';

export interface SwitchContextState {
  size: SwitchSize
  variant: SwitchVariant
}

export const [SwitchProvider, useSwitchContext] = createContext<SwitchContextState>('SwitchContext', {
  size: 'md',
  variant: 'primary',
})