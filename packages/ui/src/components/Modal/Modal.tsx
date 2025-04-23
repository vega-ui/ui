'use client';

import { FC, ReactNode } from 'react';
import { ModalProvider } from './providers';
import { useControlledState } from '@adara-cs/hooks';
import { FloatingContext, useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react';

export interface ModalProps {
  open?: boolean
  onOpenChange?(state: boolean): void
  children?: ReactNode | ReactNode[]
}

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