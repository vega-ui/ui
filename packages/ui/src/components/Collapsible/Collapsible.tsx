'use client';
import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { CollapsibleProvider } from './providers';
import { useControlledState } from '@vega-ui/hooks';

export interface CollapsibleProps {
  /**
   * Controls whether the collapsible content is expanded.
   * If provided, the component acts as a controlled component.
   */
  open?: boolean

  /**
   * Callback fired when the open state changes.
   * Called with the next boolean value when toggled.
   */
  onChangeOpen?: (value: boolean) => void

  /**
   * Optional callback that fires when the hidden (visibility) state changes.
   * This can differ from `open` if animations or delays are used.
   */
  onChangeHidden?: (value: boolean) => void

  /**
   * The content to render inside the collapsible container.
   * Can be a single node or a list of React nodes.
   */
  children?: ReactNode | ReactNode[]
}

/** The Collapsible component toggles visibility of its content, supporting controlled state and optional lifecycle callbacks for open and hidden changes */
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