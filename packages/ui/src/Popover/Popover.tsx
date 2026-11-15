'use client';
import { FC, ReactNode, useId, useState } from 'react';
import { createInput } from '@vega-ui/core';
import { useWidget, widgetEnvironment } from '../internals/widget';
import { PopoverProvider } from './contexts';
import { CLOSE_POPOVER, popoverWidget } from '@vega-ui/widgets/popover';
import { anchorNameOf, Placement } from '../internals/anchor';

export interface PopoverProps {
  /**
   * The trigger and content elements for the popover.
   * Should include `PopoverTrigger` and `PopoverContent` components.
   */
  children?: ReactNode

  /**
   * Preferred placement of the popover relative to its trigger (e.g., 'top', 'bottom-start').
   * The popover moves to the opposite side when there is no room.
   */
  placement?: Placement

  /**
   * Controls the open state of the popover.
   * When set, the component becomes controlled.
   */
  open?: boolean

  /**
   * Initial open state for uncontrolled usage.
   */
  defaultOpen?: boolean

  /**
   * Callback fired when the open state changes.
   *
   * @param state - The new open state (`true` or `false`)
   */
  onChangeOpen?(state: boolean): void

  /**
   * Defines the ARIA role of the popover content for accessibility.
   *
   * - 'listbox': Used for dropdown menus or selects
   * - 'dialog': Used for focus-trapped modal-like content
   */
  role?: 'listbox' | 'dialog'
}

/** A Popover is a UI component that displays additional content or information in a small overlay, typically triggered by a user action, such as clicking or hovering over an element. It is often used for tooltips, details, or extra options */
export const Popover: FC<PopoverProps> = ({
  placement = 'bottom',
  role,
  open: controlledOpen,
  defaultOpen = false,
  onChangeOpen,
  children,
}) => {
  const handle = useWidget(popoverWidget, { role, open: controlledOpen, defaultOpen, onChangeOpen }, widgetEnvironment)
  const id = useId();
  const [anchor, setAnchor] = useState<Element | null>(null);
  const [content, setContent] = useState<HTMLElement | null>(null);

  return (
    <PopoverProvider
      handle={handle}
      role={role}
      close={() => void handle.send(createInput(CLOSE_POPOVER))}
      contentId={content?.id || id}
      placement={placement}
      anchorName={anchorNameOf(id)}
      anchored={anchor !== null}
      setAnchor={setAnchor}
      setContent={setContent}
    >
      {children}
    </PopoverProvider>
  )
}
