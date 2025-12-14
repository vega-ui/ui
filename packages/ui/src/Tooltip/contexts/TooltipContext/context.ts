'use client';

import { CSSProperties, Ref } from 'react';
import { createContext } from '@vega-ui/react-context';
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

export const [TooltipProvider, useTooltipContext] = createContext<TooltipContextState>('TooltipContext', {
  open: false,
  changeOpen: () => undefined,
  triggerProps: {},
  contentProps: {},
  context: {} as FloatingContext<HTMLElement>
})