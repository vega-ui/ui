'use client';

import { Context, createContext, Ref } from 'react';
import { FloatingContext } from '@floating-ui/react';

export type DrawerPosition = 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'

export interface DrawerContextState {
  open: boolean
  onChangeOpen: (value: boolean) => void
  context: FloatingContext<HTMLElement>
  triggerRef?: Ref<HTMLButtonElement>
  contentRef?: Ref<HTMLDivElement>
  triggerProps?: Record<string, unknown>
  contentProps?: Record<string, unknown>
  isMounted?: boolean
  transitionStatus?: 'unmounted' | 'initial' | 'open' | 'close'
  position?: DrawerPosition
}

export const defaultDrawerContext: DrawerContextState = {
  open: false,
  onChangeOpen: () => undefined,
  triggerProps: {},
  contentProps: {},
  context: {} as FloatingContext<HTMLElement>
}

export const DrawerContext: Context<DrawerContextState> = createContext(defaultDrawerContext)