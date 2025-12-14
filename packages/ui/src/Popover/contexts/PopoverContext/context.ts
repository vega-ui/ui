'use client';

import { CSSProperties, Ref } from 'react';
import { createContext } from '@vega-ui/react-context';
import { FloatingContext, Placement } from '@floating-ui/react';

export interface PopoverContextState {
  open: boolean
  changeOpen: (value: boolean) => void
  placement?: Placement
  role?: 'tooltip' | 'dialog' | 'alertdialog' | 'menu' | 'listbox' | 'grid' | 'tree'
  context: FloatingContext<HTMLElement>
  triggerRef?: Ref<HTMLButtonElement>
  contentRef?: Ref<HTMLDivElement>
  triggerProps?: Record<string, unknown>
  contentProps?: Record<string, unknown>
  contentStyles?: CSSProperties
}

export const [PopoverProvider, usePopoverContext] = createContext<PopoverContextState>('PopoverContext', {
  open: false,
  changeOpen: () => undefined,
  placement: 'bottom',
  triggerProps: {},
  contentProps: {},
  context: {} as FloatingContext<HTMLElement>
})