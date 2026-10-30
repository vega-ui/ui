'use client';

import { CSSProperties } from 'react';
import { createContext } from '@vega-ui/react-context';
import { Placement } from '@floating-ui/react';

export interface PopoverContextState {
  open: boolean
  changeOpen: (value: boolean) => void
  contentId?: string
  placement?: Placement
  role?: 'listbox' | 'dialog'
  setReference?: (element: Element | null) => void
  setFloating?: (element: HTMLElement | null) => void
  contentStyles?: CSSProperties
}

export const [PopoverProvider, usePopoverContext] = createContext<PopoverContextState>('PopoverContext', {
  open: false,
  changeOpen: () => undefined,
  placement: 'bottom',
})
