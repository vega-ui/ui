import { FC, PropsWithChildren, useMemo } from 'react';
import { DrawerContext } from './context.ts';

interface DrawerProvider {
  open: boolean
  onChangeOpen: (value: boolean) => void
}

export const DrawerProvider: FC<PropsWithChildren<DrawerProvider>> = ({ open, onChangeOpen, children }) => {
  const value = useMemo(() => ({
    open,
    onChangeOpen,
  }), [open, onChangeOpen])

  return (
    <DrawerContext.Provider value={value}>
      {children}
    </DrawerContext.Provider>
  )
}