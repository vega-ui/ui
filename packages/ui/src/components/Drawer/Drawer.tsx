'use client';

import {
  Ref,
  FC, ReactNode,
} from 'react';
import {
  FloatingContext,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus
} from '@floating-ui/react';
import { useControlledState } from '@adara-cs/hooks';
import { DrawerPosition, DrawerProvider } from './providers';

export interface DrawerProps {
  dismissible?: boolean
  open?: boolean
  onChangeOpen?: (value: boolean) => void
  position?: DrawerPosition
  ref?: Ref<HTMLDivElement>
  children?: ReactNode
}

export const Drawer: FC<DrawerProps> = ({
  dismissible = true,
  position = 'right',
  open: controlledOpen,
  onChangeOpen: controlledOnChangeOpen,
  children,
}) => {
  const [isOpen, setIsOpen] = useControlledState(controlledOpen, false, controlledOnChangeOpen)

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'pointerdown',
    enabled: dismissible
  });
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  const { isMounted, status } = useTransitionStatus(context);

  return (
    <DrawerProvider
      context={context as FloatingContext<HTMLElement>}
      contentRef={refs.setFloating}
      triggerRef={refs.setReference}
      contentProps={getFloatingProps()}
      triggerProps={getReferenceProps()}
      open={isOpen}
      onChangeOpen={setIsOpen}
      isMounted={isMounted}
      transitionStatus={status}
      position={position}
    >
      {children}
    </DrawerProvider>
  )
}