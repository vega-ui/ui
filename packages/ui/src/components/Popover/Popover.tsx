'use client';
import { FC, ReactNode } from 'react';
import {
  autoUpdate, flip, FloatingContext, offset,
  Placement, shift, useClick, useDismiss, useFloating, useInteractions, useRole,
} from '@floating-ui/react';
import { useControlledState } from '@vega-ui/hooks';
import { PopoverProvider } from './providers';

export interface PopoverProps {
  /**
   * The trigger and content elements for the popover.
   * Should include `PopoverTrigger` and `PopoverContent` components.
   */
  children?: ReactNode

  /**
   * Preferred placement of the popover relative to its trigger.
   * Follows the Floating UI `Placement` type (e.g., 'top', 'bottom-start').
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
  onOpenChange?(state: boolean): void

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
  role: ariaRole,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [open, setOpen] = useControlledState(controlledOpen, defaultOpen, onOpenChange);

  const { refs, floatingStyles, context } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), flip(), shift()],
    placement,
    open,
    onOpenChange: setOpen,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: ariaRole });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <PopoverProvider
      open={open}
      role={ariaRole}
      contentStyles={floatingStyles}
      changeOpen={setOpen}
      placement={placement}
      context={context as FloatingContext<HTMLElement>}
      triggerProps={getReferenceProps()}
      contentProps={getFloatingProps()}
      triggerRef={refs.setReference}
      contentRef={refs.setFloating}
    >
      {children}
    </PopoverProvider>
  )
}