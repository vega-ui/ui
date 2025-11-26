'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { IndexedSnapScrollerContext, IndexedSnapScrollerContextState } from './context';

type IndexedSnapScrollerProviderProps = IndexedSnapScrollerContextState

export const IndexedSnapScrollerProvider: FC<PropsWithChildren<IndexedSnapScrollerProviderProps>> = ({
  index,
  children
}) => {
  const value = useMemo(() => ({
    index,
  }), [index])

  return (
    <IndexedSnapScrollerContext.Provider value={value}>
      {children}
    </IndexedSnapScrollerContext.Provider>
  )
}