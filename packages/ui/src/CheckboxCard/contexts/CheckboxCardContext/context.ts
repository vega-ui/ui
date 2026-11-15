'use client';

import { CheckboxCardSize, CheckboxVariant } from '../../types';
import { createContext } from '../../../internals/context';

export interface CheckboxCardContextState {
  size: CheckboxCardSize
  variant: CheckboxVariant
}

export const [CheckboxCardProvider, useCheckboxCardContext] = createContext<CheckboxCardContextState>('CheckboxCardContext', {
  size: 'md',
  variant: 'primary',
})