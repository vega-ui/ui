'use client';

import { createContext } from '@vega-ui/react-context';
import { FloatingContext } from '@floating-ui/react';
import { DrawerPosition } from '../../types.ts';

export interface DrawerContextState {
  open: boolean
  onChangeOpen: (value: boolean) => void
  context: FloatingContext<HTMLElement>
  triggerProps?: Record<string, unknown>
  contentProps?: Record<string, unknown>
  isMounted?: boolean
  transitionStatus?: 'unmounted' | 'initial' | 'open' | 'close'
  position?: DrawerPosition
}

export const [DrawerProvider, useDrawerContext] = createContext<DrawerContextState>('PhoneFieldContext', {
  open: false,
  onChangeOpen: () => undefined,
  triggerProps: {},
  contentProps: {},
  context: {} as FloatingContext<HTMLElement>
})