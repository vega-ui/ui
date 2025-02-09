'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { ModalContext } from './context.ts';

interface ModalProvider {
  open: boolean
  changeOpen: (value: boolean) => void
}

export const ModalProvider: FC<PropsWithChildren<ModalProvider>> = ({ open, changeOpen, children }) => {
  const value = useMemo(() => ({
    open,
    changeOpen,
  }), [open, changeOpen])

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}