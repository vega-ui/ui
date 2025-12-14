'use client';

import { createContext } from '@vega-ui/react-context';

export interface ResponsiveSelectContextState {
  isBreakpoint: boolean
}

export const [ResponsiveSelectProvider, useResponsiveSelectContext] = createContext<ResponsiveSelectContextState>('ResponsiveSelectContext', {
  isBreakpoint: false,
})