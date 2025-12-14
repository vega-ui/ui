'use client';

import { CheckboxCardSize } from '../../types.ts';
import { createContext } from '@vega-ui/react-context';

export interface CheckboxCardContextState {
  size: CheckboxCardSize
}

export const [CheckboxCardProvider, useCheckboxCardContext] = createContext<CheckboxCardContextState>('CheckboxCardContext', {
  size: 'medium'
})