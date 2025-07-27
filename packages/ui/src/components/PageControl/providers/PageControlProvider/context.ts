'use client';

import { Context, createContext } from 'react';
import { PageControlSize, PageControlVariant } from '../../types.ts';

export interface PageControlContextState {
  active?: number
  variant: PageControlVariant
  size?: PageControlSize
  itemRef?: (index: number) => (elem: HTMLElement | null) => void
}

export const defaultPageControlContext: PageControlContextState = {
  active: undefined,
  variant: 'default',
  size: 'md',
}

export const PageControlContext: Context<PageControlContextState> = createContext(defaultPageControlContext)