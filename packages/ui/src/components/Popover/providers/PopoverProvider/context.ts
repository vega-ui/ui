'use client';

import { Context, createContext, CSSProperties, Ref } from 'react';
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

export const defaultPopoverContext: PopoverContextState = {
  open: false,
  changeOpen: () => undefined,
  placement: 'bottom',
  triggerProps: {},
  contentProps: {},
  context: {} as FloatingContext<HTMLElement>
}

export const PopoverContext: Context<PopoverContextState> = createContext(defaultPopoverContext)