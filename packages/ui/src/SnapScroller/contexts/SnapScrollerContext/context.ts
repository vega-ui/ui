'use client';

import { createContext } from '@vega-ui/react-context';

export interface SnapScrollerContextState {
  itemRef(key: number): (element: HTMLDivElement) => void
}

export const [SnapScrollerProvider, useSnapScrollerContext] = createContext<SnapScrollerContextState>('SnapScrollerContext', {
  itemRef() {
    return () => {}
  },
})