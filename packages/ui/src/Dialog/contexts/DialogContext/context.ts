'use client';

import { createContext } from '@vega-ui/react-context';
import { FloatingContext } from '@floating-ui/react';

export interface DialogContextState {
  open: boolean
  changeOpen: (value: boolean) => void
  context: FloatingContext<HTMLElement>
  status?: 'unmounted' | 'initial' | 'open' | 'close'
  triggerProps?: Record<string, unknown>
  contentProps?: Record<string, unknown>
  fluid?: boolean
  isMounted: boolean
}

export const [DialogProvider, useDialogContext] = createContext<DialogContextState>('DialogContext', {
  open: false,
  changeOpen: () => undefined,
  triggerProps: {},
  contentProps: {},
  context: {} as FloatingContext<HTMLElement>,
  isMounted: false,
})