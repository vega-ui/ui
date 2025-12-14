'use client';

import { Ref } from 'react';
import { createContext } from '@vega-ui/react-context';
import { FloatingContext } from '@floating-ui/react';

export interface ModalContextState {
  open: boolean
  changeOpen: (value: boolean) => void
  context: FloatingContext<HTMLElement>
  triggerRef?: Ref<HTMLButtonElement>
  contentRef?: Ref<HTMLDivElement>
  triggerProps?: Record<string, unknown>
  contentProps?: Record<string, unknown>
}

export const [ModalProvider, useModalContext] = createContext<ModalContextState>('ModalContext', {
  open: false,
  changeOpen: () => undefined,
  triggerProps: {},
  contentProps: {},
  context: {} as FloatingContext<HTMLElement>
})