'use client';
import { FC, ReactNode, useCallback, useEffect, useId, useState } from 'react';
import { CollapsibleProvider } from './contexts';
import { useControlledState, useEventCallback } from '@vega-ui/hooks';

export interface CollapsibleProps {
  /**
   * Controls whether the collapsible content is expanded.
   * If provided, the component acts as a controlled component.
   */
  open?: boolean
  
  /**
   * Controls whether the collapsible content default is expanded.
   */
  defaultOpen?: boolean;
  
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
  
  /**
   * ID of the collapsible content element.
   *
   * Used to:
   * - link trigger and content via accessibility attributes (`aria-controls`)
   * - expose the expanded region to assistive technologies
   * - provide a stable identifier for testing and DOM querying
   *
   * If not provided, an ID generated internally.
   */
  contentId?: string
}

/** The Collapsible component toggles visibility of its content, supporting controlled state and optional lifecycle callbacks for open and hidden changes */
export const Collapsible: FC<CollapsibleProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onChangeOpen: onControlledChangeOpen,
  onChangeHidden: _onChangeHidden,
  contentId,
  children
}) => {
  const cId = useId()
  
  const [open, onChangeOpen] = useControlledState(controlledOpen, defaultOpen, onControlledChangeOpen)
  const [hidden, setHidden] = useState(!open)
  
  const onOpen = useCallback(() => {
    onChangeOpen?.(true)
  }, [onChangeOpen])

  const onClose = useCallback(() => {
    onChangeOpen?.(false)
  }, [onChangeOpen])

  const onChangeHidden = useEventCallback(_onChangeHidden)

  useEffect(() => {
    onChangeHidden(hidden)
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
    <CollapsibleProvider
      contentId={contentId ?? cId}
      onTransitionEnd={onTransitionEnd}
      hidden={hidden}
      opened={open}
      open={onOpenContent}
      close={onClose}
    >
      {children}
    </CollapsibleProvider>
  )
}