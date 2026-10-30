'use client';

import { createContext } from '@vega-ui/react-context';
import { DrawerPosition } from '../../types';

export interface DrawerContextState {
  open: boolean
  changeOpen: (value: boolean) => void
  position?: DrawerPosition
}

export const [DrawerProvider, useDrawerContext] = createContext<DrawerContextState>('DrawerContext', {
  open: false,
  changeOpen: () => undefined,
})
