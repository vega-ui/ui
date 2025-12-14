'use client';

import { PageControlSize, PageControlVariant } from '../../types.ts';
import { createContext } from '@vega-ui/react-context';

export interface PageControlContextState {
  active?: number
  variant: PageControlVariant
  size?: PageControlSize
  itemRef?: (index: number) => (elem: HTMLElement | null) => void
}

export const [PageControlProvider, usePageControlContext] = createContext<PageControlContextState>('PageControlContext', {
  active: undefined,
  variant: 'default',
  size: 'md',
})