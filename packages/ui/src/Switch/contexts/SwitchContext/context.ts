'use client';

import { createContext } from '../../../internals/context';
import { SwitchSize, SwitchVariant } from '../../types';

export interface SwitchContextState {
  size: SwitchSize
  variant: SwitchVariant
}

export const [SwitchProvider, useSwitchContext] = createContext<SwitchContextState>('SwitchContext', {
  size: 'md',
  variant: 'primary',
})