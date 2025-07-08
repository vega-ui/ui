'use client';

import { Context, createContext } from 'react';
import { CheckboxCardSize } from '../../types.ts';

export interface CheckboxCardContextState {
  size: CheckboxCardSize
}

export const defaultCheckboxCardContext: CheckboxCardContextState = {
  size: 'medium'
}

export const CheckboxCardContext: Context<CheckboxCardContextState> = createContext(defaultCheckboxCardContext)