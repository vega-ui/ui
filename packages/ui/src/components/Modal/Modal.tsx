'use client';

import { FC, ReactElement, ReactNode, Ref } from 'react';
import { csx, mergeRefs } from '@adara-cs/utils';
import styles from './style.module.css'
import {
  FloatingFocusManager, FloatingOverlay, FloatingPortal,
  useClick, useDismiss,
  useFloating,
  useInteractions, useRole, useTransitionStyles
} from '@floating-ui/react';
import { ModalProvider } from './providers';
import { useControlledState } from '@adara-cs/hooks';

export interface ModalProps {
  className?: string
  overlayClassName?: string
  triggerSlot?: (ref: Ref<never>, props?: Record<string, unknown>) => ReactElement
  open?: boolean
  onOpenChange?(state?: boolean): void
  children?: ReactNode | ReactNode[]
  fluid?: boolean
  blurredOverlay?: boolean
  ref?: Ref<HTMLDivElement>
}

export const Modal: FC<ModalProps> = ({
  triggerSlot,
  blurredOverlay = true,
  className,
  overlayClassName,
  fluid = false,
  open: controlledOpen,
  onOpenChange,
  children,
  ref,
}) => {
  const [open, setOpen] = useControlledState(controlledOpen, false, onOpenChange)

  const { refs, context } = useFloating({
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

  const { styles: transitionStyles, isMounted } = useTransitionStyles(context, {
    duration: {
      open: 250,
      close: 150
    },
    initial: {
      transform: 'scale(.95)'
    },
    open: {
      transform: 'scale(1)'
    },
    close: {
      transform: 'scale(.95)'
    }
  });

  return (
    <>
      {triggerSlot?.(refs.setReference, getReferenceProps())}
      <FloatingPortal>
        <ModalProvider open={open} changeOpen={setOpen}>
          {isMounted && (
            <FloatingOverlay data-blurred={blurredOverlay} className={csx(styles.modalOverlay, overlayClassName)} lockScroll>
              <FloatingFocusManager context={context}>
                <div
                  data-fluid={fluid}
                  style={{...transitionStyles}}
                  className={csx(styles.modal, className)}
                  ref={mergeRefs([refs.setFloating, ref])}
                  {...getFloatingProps()}
                >
                  {children}
                </div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </ModalProvider>
      </FloatingPortal>
    </>
  )
}