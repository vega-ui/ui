'use client';
import { FC, ReactNode } from 'react';
import {
  autoUpdate, flip, FloatingContext, offset,
  Placement, shift, useClick, useDismiss, useFloating, useInteractions, useRole,
} from '@floating-ui/react';
import { useControlledState } from '@adara-cs/hooks';
import { PopoverProvider } from './providers';

export interface PopoverProps {
  children?: ReactNode
  placement?: Placement
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?(state: boolean): void
  role?: 'listbox' | 'dialog'
}

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