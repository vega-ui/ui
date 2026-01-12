'use client';

import { FC, ReactNode } from 'react';
import { DialogProvider } from './contexts';
import { useControlledState } from '@vega-ui/hooks';
import {
  FloatingContext,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole, useTransitionStatus,
} from '@floating-ui/react';

export interface DialogProps {
  /**
   * Whether the modal is currently open.
   * When provided, the modal becomes a controlled component.
   */
  open?: boolean
  
  /**
   * Whether the modal is default open.
   */
  defaultOpen?: boolean

  /**
   * Callback fired when the modal's open state changes.
   * Receives the next boolean state.
   */
  onOpenChange?(state: boolean): void

  /**
   * The content rendered inside the dialog.
   * Can include headings, text, actions, and nested components.
   */
  children?: ReactNode | ReactNode[]
  
  /**
   * Makes the dialog fluid, allowing it to stretch responsively within its container.
   * Useful for adapting to different screen sizes or layouts.
   */
  fluid?: boolean
}

/** A Dialog is a UI component that displays content in a layer above the main page, often used for alerts, forms, or confirmations, requiring user interaction before returning to the main content */
export const Dialog: FC<DialogProps> = ({
  open: controlledOpen,
  onOpenChange,
  fluid,
  defaultOpen = false,
  children,
}) => {
  const [open, setOpen] = useControlledState(controlledOpen, defaultOpen, onOpenChange)

  const { context } = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: 'pointerdown' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);
  
  const { status, isMounted } = useTransitionStatus(context);

  return (
    <DialogProvider
      context={context as FloatingContext<HTMLElement>}
      contentProps={getFloatingProps()}
      triggerProps={getReferenceProps()}
      open={open}
      changeOpen={setOpen}
      status={status}
      isMounted={isMounted}
      fluid={fluid}
    >
      {children}
    </DialogProvider>
  )
}