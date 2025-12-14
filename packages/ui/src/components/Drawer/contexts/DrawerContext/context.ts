'use client';

import { Ref } from 'react';
import { createContext } from '@vega-ui/react-context';
import { FloatingContext } from '@floating-ui/react';
import { DrawerPosition } from '../../types.ts';

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

export const [DrawerProvider, useDrawerContext] = createContext<DrawerContextState>('DrawerContext', {
  open: false,
  onChangeOpen: () => undefined,
  triggerProps: {},
  contentProps: {},
  context: {} as FloatingContext<HTMLElement>
})