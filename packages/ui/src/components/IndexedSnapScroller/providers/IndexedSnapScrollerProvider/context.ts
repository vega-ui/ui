'use client';

import { createContext } from 'react';

export interface IndexedSnapScrollerContextState {
  index: number
}

export const defaultIndexedSnapScrollerContext: IndexedSnapScrollerContextState = {
  index: 0
}

export const IndexedSnapScrollerContext = createContext<IndexedSnapScrollerContextState>(defaultIndexedSnapScrollerContext)