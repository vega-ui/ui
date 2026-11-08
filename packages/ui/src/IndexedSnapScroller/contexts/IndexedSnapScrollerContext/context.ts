'use client';

import { createContext } from '@vega-ui/react-kit/context';

export interface IndexedSnapScrollerContextState {
  index: number
}

export const [IndexedSnapScrollerProvider, useIndexedSnapScrollerContext] = createContext<IndexedSnapScrollerContextState>('IndexedSnapScrollerContext', {
  index: 0
})