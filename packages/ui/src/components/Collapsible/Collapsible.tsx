'use client';
import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { CollapsibleProvider } from './providers';
import { useControlledState } from '@adara-cs/hooks';

export interface CollapsibleProps {
  open?: boolean
  onChangeOpen?: (value: boolean) => void
  onChangeHidden?: (value: boolean) => void
  children?: ReactNode | ReactNode[]
}

export const Collapsible: FC<CollapsibleProps> = ({ open: controlledOpen, onChangeOpen: onControlledChangeOpen, onChangeHidden, children }) => {
  const [open, onChangeOpen] = useControlledState(controlledOpen, false, onControlledChangeOpen)
  const [hidden, setHidden] = useState(false)

  const onOpen = useCallback(() => {
    onChangeOpen?.(true)
  }, [onChangeOpen])

  const onClose = useCallback(() => {
    onChangeOpen?.(false)
  }, [onChangeOpen])

  useEffect(() => {
    if (controlledOpen == undefined) onControlledChangeOpen?.(open)
  }, [open, onControlledChangeOpen, controlledOpen])

  useEffect(() => {
    onChangeHidden?.(hidden)
  }, [hidden, onChangeHidden])

  const onOpenContent = useCallback(() => {
    setHidden(false)
    requestAnimationFrame(() => {
      onOpen()
    })
  }, [onOpen])

  const onTransitionEnd = useCallback(() => {
    if (!open) setHidden(true)
  }, [open])

  return (
    <CollapsibleProvider onTransitionEnd={onTransitionEnd} hidden={hidden} opened={open} onOpen={onOpenContent} onClose={onClose}>
      {children}
    </CollapsibleProvider>
  )
}