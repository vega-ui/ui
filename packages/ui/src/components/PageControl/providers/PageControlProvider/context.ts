'use client';

import { Context, createContext } from 'react';
import { PageControlVariant } from '../../types.ts';

export interface PageControlContextState {
  active?: number
  variant: PageControlVariant
}

export const defaultPageControlContext: PageControlContextState = {
  active: undefined,
  variant: 'default'
}

export const PageControlContext: Context<PageControlContextState> = createContext(defaultPageControlContext)