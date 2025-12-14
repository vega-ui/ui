'use client';

import { createContext } from '@vega-ui/react-context';

export interface ResponsiveModalContextState {
  isBreakpoint: boolean
}

export const [ResponsiveModalProvider, useResponsiveModalContext] = createContext('ResponsiveModalContext', {
  isBreakpoint: false,
})