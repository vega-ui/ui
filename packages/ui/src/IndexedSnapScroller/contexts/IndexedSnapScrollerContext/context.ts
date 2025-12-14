'use client';

import { createContext } from '@vega-ui/react-context';

export interface IndexedSnapScrollerContextState {
  index: number
}

export const [IndexedSnapScrollerProvider, useIndexedSnapScrollerContext] = createContext<IndexedSnapScrollerContextState>('IndexedSnapScrollerContext', {
  index: 0
})