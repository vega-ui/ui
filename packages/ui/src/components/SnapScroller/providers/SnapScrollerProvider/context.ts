'use client';

import { createContext } from 'react';

export interface SnapScrollerContextState {
  itemRef(key: number): (element: HTMLDivElement) => void
}

export const defaultSnapScrollerContext: SnapScrollerContextState = {
  itemRef() {
    return () => {}
  },
}

export const SnapScrollerContext = createContext<SnapScrollerContextState>(defaultSnapScrollerContext)