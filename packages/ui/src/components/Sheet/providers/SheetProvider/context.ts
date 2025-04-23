'use client';

import { Context, createContext, PointerEventHandler, Ref, UIEventHandler } from 'react';
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

export const defaultSheetContext: SheetContextState = {
  open: false,
  changeOpen: () => undefined,
  triggerProps: {},
  contentProps: {},
  context: {} as FloatingContext<HTMLElement>
}

export const SheetContext: Context<SheetContextState> = createContext(defaultSheetContext)