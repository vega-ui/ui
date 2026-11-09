'use client';

import { createContext } from '@vega-ui/react-kit/context';

export interface CollapsibleContextState {
  opened: boolean
  hidden: boolean
  contentId: string
  open: VoidFunction,
  close: VoidFunction
  hide: VoidFunction
}

export const [CollapsibleProvider, useCollapsibleContext] = createContext<CollapsibleContextState>('CollapsibleContext', {
  opened: false,
  hidden: true,
  contentId: '',
  open: () => undefined,
  close: () => undefined,
  hide: () => undefined
})