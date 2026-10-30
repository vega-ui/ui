'use client';

import { CSSProperties, Ref } from 'react';
import { createContext } from '@vega-ui/react-context';
import { FloatingContext } from '@floating-ui/react';

export interface TooltipContextState {
  open: boolean
  changeOpen: (value: boolean) => void
  show: () => void
  hide: () => void
  hideAfterDelay: () => void
  context: FloatingContext
  contentId?: string
  side?: string
  arrowX?: number
  arrowY?: number
  arrowRef?: Ref<SVGSVGElement>
  setReference?: (element: Element | null) => void
  setFloating?: (element: HTMLElement | null) => void
  contentStyle?: CSSProperties
}

export const [TooltipProvider, useTooltipContext] = createContext<TooltipContextState>('TooltipContext', {
  open: false,
  changeOpen: () => undefined,
  show: () => undefined,
  hide: () => undefined,
  hideAfterDelay: () => undefined,
  context: {} as FloatingContext
})
