'use client';

import { Context, createContext, Ref } from 'react';
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

export const defaultModalContext: ModalContextState = {
  open: false,
  changeOpen: () => undefined,
  triggerProps: {},
  contentProps: {},
  context: {} as FloatingContext<HTMLElement>
}

export const ModalContext: Context<ModalContextState> = createContext(defaultModalContext)