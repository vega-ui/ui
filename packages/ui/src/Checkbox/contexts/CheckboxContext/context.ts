'use client';

import { createContext } from '@vega-ui/react-context';
import { CheckboxSize, CheckboxVariant } from '../../types';

export interface CheckboxContextState {
  size?: CheckboxSize
  variant?: CheckboxVariant
}

export const [CheckboxProvider, useCheckboxContext] = createContext<CheckboxContextState>('CheckboxContext', {
  size: 'md',
  variant: 'primary',
})