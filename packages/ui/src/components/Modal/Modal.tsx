'use client';

import { FC, ReactNode } from 'react';
import { ModalProvider } from './providers';
import { useControlledState } from '@adara-cs/hooks';
import { FloatingContext, useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react';

export interface ModalProps {
  /**
   * Whether the modal is currently open.
   * When provided, the modal becomes a controlled component.
   */
  open?: boolean

  /**
   * Callback fired when the modal's open state changes.
   * Receives the next boolean state.
   */
  onOpenChange?(state: boolean): void

  /**
   * The content rendered inside the modal.
   * Can include headings, text, actions, and nested components.
   */
  children?: ReactNode | ReactNode[]
}

/** A Modal is a UI component that displays content in a layer above the main page, often used for alerts, forms, or confirmations, requiring user interaction before returning to the main content */
export const Modal: FC<ModalProps> = ({
  open: controlledOpen,
  onOpenChange,
  children,
}) => {
  const [open, setOpen] = useControlledState(controlledOpen, false, onOpenChange)

  const { context, refs } = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const click = useClick(context);
  const role = useRole(context );
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <ModalProvider
      triggerRef={refs.setReference}
      contentRef={refs.setFloating}
      context={context as FloatingContext<HTMLElement>}
      contentProps={getFloatingProps()}
      triggerProps={getReferenceProps()}
      open={open}
      changeOpen={setOpen}
    >
      {children}
    </ModalProvider>
  )
}