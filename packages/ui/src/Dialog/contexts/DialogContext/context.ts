'use client';

import { Ref } from 'react';
import { createContext } from '@vega-ui/react-context';
import { FloatingContext } from '@floating-ui/react';

export interface DialogContextState {
  open: boolean
  changeOpen: (value: boolean) => void
  context: FloatingContext<HTMLElement>
  triggerRef?: Ref<HTMLButtonElement>
  contentRef?: Ref<HTMLDivElement>
  triggerProps?: Record<string, unknown>
  contentProps?: Record<string, unknown>
}

export const [DialogProvider, useDialogContext] = createContext<DialogContextState>('DialogContext', {
  open: false,
  changeOpen: () => undefined,
  triggerProps: {},
  contentProps: {},
  context: {} as FloatingContext<HTMLElement>
})