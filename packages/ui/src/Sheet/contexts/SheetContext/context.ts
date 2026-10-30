'use client';

import { createContext } from '@vega-ui/react-context';

export interface SheetContextState {
  open: boolean
  changeOpen: (value: boolean) => void
  changeHeight: (height: number) => void
  height: number
  viewport: number
  offsets: number[]
  activeSnapPoint: number
  changeActiveSnapPoint: (index: number) => void
  steppedSnapPoints?: boolean
}

export const [SheetProvider, useSheetContext] = createContext<SheetContextState>('SheetContext', {
  open: false,
  changeOpen: () => undefined,
  changeHeight: () => undefined,
  height: 0,
  viewport: 0,
  offsets: [0],
  activeSnapPoint: 0,
  changeActiveSnapPoint: () => undefined,
})
