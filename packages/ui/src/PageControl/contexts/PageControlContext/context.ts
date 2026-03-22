'use client';

import { PageControlSize } from '../../types';
import { createContext } from '@vega-ui/react-context';

export interface PageControlContextState {
  active?: number
  size?: PageControlSize
  itemRef?: (index: number) => (elem: HTMLElement | null) => void
}

export const [PageControlProvider, usePageControlContext] = createContext<PageControlContextState>('PageControlContext', {
  active: undefined,
  size: 'md',
})