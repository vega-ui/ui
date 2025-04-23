'use client';

import { Context, createContext, CSSProperties, Ref } from 'react';
import { FloatingContext } from '@floating-ui/react';

export interface TooltipContextState {
  open: boolean
  changeOpen: (value: boolean) => void
  context: FloatingContext<HTMLElement>
  triggerRef?: Ref<HTMLButtonElement>
  arrowRef?: Ref<SVGSVGElement>
  contentRef?: Ref<HTMLDivElement>
  triggerProps?: Record<string, unknown>
  contentProps?: Record<string, unknown>
  contentStyle?: CSSProperties
}

export const defaultTooltipContext: TooltipContextState = {
  open: false,
  changeOpen: () => undefined,
  triggerProps: {},
  contentProps: {},
  context: {} as FloatingContext<HTMLElement>
}

export const TooltipContext: Context<TooltipContextState> = createContext(defaultTooltipContext)