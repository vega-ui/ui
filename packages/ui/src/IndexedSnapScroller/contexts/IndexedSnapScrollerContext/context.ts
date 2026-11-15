'use client';

import { createContext } from '../../../internals/context';

export interface IndexedSnapScrollerContextState {
  index: number
}

export const [IndexedSnapScrollerProvider, useIndexedSnapScrollerContext] = createContext<IndexedSnapScrollerContextState>('IndexedSnapScrollerContext', {
  index: 0
})