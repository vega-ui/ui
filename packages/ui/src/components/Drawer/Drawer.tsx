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
import { useControlledState } from '@vega-ui/hooks';
import { DrawerPosition, DrawerProvider } from './providers';

export interface DrawerProps {
  /**
   * Allows the drawer to be closed by clicking outside or pressing Escape.
   * When false, the drawer stays open until explicitly closed.
   */
  dismissible?: boolean

  /**
   * Controls whether the drawer is open.
   * When provided, the component becomes controlled.
   */
  open?: boolean

  /**
   * Callback fired when the drawer's open state changes.
   * Receives the new state as a boolean.
   */
  onChangeOpen?: (value: boolean) => void

  /**
   * Defines from which side of the screen the drawer appears.
   */
  position?: DrawerPosition

  /**
   * Ref forwarded to the drawer's root DOM element.
   * Useful for focus management or animation hooks.
   */
  ref?: Ref<HTMLDivElement>

  /**
   * The content to display inside the drawer.
   * Typically, includes navigation, settings, or forms.
   */
  children?: ReactNode
}

/** A Drawer is a UI component that slides in from the side of the screen to display additional content or navigation options, often used for menus or sidebars */
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