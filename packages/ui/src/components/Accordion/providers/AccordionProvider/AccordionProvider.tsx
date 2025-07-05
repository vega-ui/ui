'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { AccordionContext, AccordionContextState } from './context.ts'; 

type AccordionProviderProps = AccordionContextState

export const AccordionProvider: FC<PropsWithChildren<AccordionProviderProps>> = ({ opened, onChangeOpened, size, separated, children }) => {
  const value = useMemo(() => ({
    opened,
    onChangeOpened,
    size,
    separated,
  }), [opened, onChangeOpened, size, separated])

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  )
}