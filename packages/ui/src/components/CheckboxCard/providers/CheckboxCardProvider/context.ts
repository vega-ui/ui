'use client';

import { Context, createContext } from 'react';

export interface CheckboxCardContextState {
  size: 'small' | 'medium' | 'large'
}

export const defaultCheckboxCardContext: CheckboxCardContextState = {
  size: 'medium'
}

export const CheckboxCardContext: Context<CheckboxCardContextState> = createContext(defaultCheckboxCardContext)