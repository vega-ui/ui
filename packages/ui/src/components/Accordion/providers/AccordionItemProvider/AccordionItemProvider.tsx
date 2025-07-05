'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { AccordionItemContext, AccordionItemContextState } from './context.ts';

type AccordionItemProviderProps = AccordionItemContextState

export const AccordionItemProvider: FC<PropsWithChildren<AccordionItemProviderProps>> = ({ size, children }) => {
  const value = useMemo(() => ({
    size,
  }), [size])

  return (
    <AccordionItemContext.Provider value={value}>
      {children}
    </AccordionItemContext.Provider>
  )
}