'use client';

import { TransitionEventHandler } from 'react';
import { createContext } from '@vega-ui/react-context';

export interface CollapsibleContextState {
  opened: boolean
  hidden: boolean
  contentId: string
  open: VoidFunction,
  close: VoidFunction
  onTransitionEnd?: TransitionEventHandler<HTMLDivElement>
}

export const [CollapsibleProvider, useCollapsibleContext] = createContext<CollapsibleContextState>('CollapsibleContext', {
  opened: false,
  hidden: true,
  contentId: '',
  open: () => undefined,
  close: () => undefined,
  onTransitionEnd: undefined
})