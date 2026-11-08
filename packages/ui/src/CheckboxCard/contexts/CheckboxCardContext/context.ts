'use client';

import { CheckboxCardSize, CheckboxVariant } from '../../types';
import { createContext } from '@vega-ui/react-kit/context';

export interface CheckboxCardContextState {
  size: CheckboxCardSize
  variant: CheckboxVariant
}

export const [CheckboxCardProvider, useCheckboxCardContext] = createContext<CheckboxCardContextState>('CheckboxCardContext', {
  size: 'md',
  variant: 'primary',
})