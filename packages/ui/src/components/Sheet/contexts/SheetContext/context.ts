'use client';

import { PointerEventHandler, Ref, UIEventHandler } from 'react';
import { createContext } from '@vega-ui/react-context';
import { FloatingContext } from '@floating-ui/react';

export interface SheetContextState {
  open: boolean
  changeOpen: (value: boolean) => void
  context: FloatingContext<HTMLElement>
  triggerRef?: Ref<HTMLButtonElement>
  contentRef?: Ref<HTMLDivElement>
  triggerProps?: Record<string, unknown>
  contentProps?: Record<string, unknown>
  transitionStatus?: 'unmounted' | 'initial' | 'open' | 'close'
  isMounted?: boolean
  onPress?: PointerEventHandler
  onDrag?: PointerEventHandler
  onRelease?: PointerEventHandler
  onScrollCapture?: UIEventHandler
  offset?: number
  transforming?: boolean
}

export const [SheetProvider, useSheetContext] = createContext<SheetContextState>('SheetContext', {
  open: false,
  changeOpen: () => undefined,
  triggerProps: {},
  contentProps: {},
  context: {} as FloatingContext<HTMLElement>
})