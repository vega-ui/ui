import { FC, PropsWithChildren, Ref, TransitionEventHandler, useMemo } from 'react';
import { CollapsibleContext } from './context.ts';

interface CollapsibleProvider {
  opened: boolean
  hidden: boolean
  onOpen: () => void
  onClose: () => void
  contentRef?: Ref<HTMLDivElement>
  wrapperRef?: Ref<HTMLDivElement>
  onTransitionEnd?: TransitionEventHandler<HTMLDivElement>
}

export const CollapsibleProvider: FC<PropsWithChildren<CollapsibleProvider>> = ({ opened, wrapperRef, contentRef, onTransitionEnd, hidden, onOpen, onClose, children }) => {
  const value = useMemo(() => ({
    opened,
    hidden,
    open: onOpen,
    close: onClose,
    wrapperRef,
    contentRef,
    onTransitionEnd,
  }), [opened, onOpen, onClose, hidden, wrapperRef, contentRef, onTransitionEnd])

  return (
    <CollapsibleContext.Provider value={value}>
      {children}
    </CollapsibleContext.Provider>
  )
}