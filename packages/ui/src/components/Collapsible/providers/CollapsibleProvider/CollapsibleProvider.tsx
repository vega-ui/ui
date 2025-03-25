'use client';
import { FC, PropsWithChildren, TransitionEventHandler, useMemo } from 'react';
import { CollapsibleContext } from './context.ts';

interface CollapsibleProvider {
  opened: boolean
  hidden: boolean
  onOpen: () => void
  onClose: () => void
  onTransitionEnd?: TransitionEventHandler<HTMLDivElement>
}

export const CollapsibleProvider: FC<PropsWithChildren<CollapsibleProvider>> = ({ opened, onTransitionEnd, hidden, onOpen, onClose, children }) => {
  const value = useMemo(() => ({
    opened,
    hidden,
    open: onOpen,
    close: onClose,
    onTransitionEnd,
  }), [opened, onOpen, onClose, hidden, onTransitionEnd])

  return (
    <CollapsibleContext.Provider value={value}>
      {children}
    </CollapsibleContext.Provider>
  )
}