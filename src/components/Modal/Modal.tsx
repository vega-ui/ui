import { FC, ReactElement, ReactNode, Ref, useId, useState } from 'react';
import { csx } from '../../utils/css';
import styles from './style.module.css'
import {
  FloatingFocusManager, FloatingOverlay, FloatingPortal,
  useClick, useDismiss,
  useFloating,
  useInteractions, useRole, useTransitionStyles
} from '@floating-ui/react';
import { Heading } from '../Heading';
import { IconButton } from '../IconButton';

export interface ModalProps {
  className?: string
  overlayClassName?: string
  triggerSlot?: (ref: Ref<never>, props?: Record<string, unknown>) => ReactElement
  open?: boolean
  onOpenChange?(state?: boolean): void
  children?: ReactNode
  fluid?: boolean
  withClose?: boolean
  blurredOverlay?: boolean
  title?: string
}

export const Modal: FC<ModalProps> = ({
  triggerSlot,
  blurredOverlay = true,
  className,
  overlayClassName,
  fluid = false,
  withClose = true,
  title,
  open: controlledOpen,
  onOpenChange,
  children
}) => {
  const [open, setOpen] = useState(controlledOpen ?? false);

  const isOpenModal = controlledOpen ?? open;
  const setOpenModal = onOpenChange ?? setOpen;

  const { refs, context } = useFloating({
    open: isOpenModal,
    onOpenChange: setOpenModal,
  });

  const headingId = useId();

  const click = useClick(context);
  const role = useRole(context );
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
  });

  return (
    <>
      {triggerSlot?.(refs.setReference, getReferenceProps())}
      <FloatingPortal>
        {isOpenModal && (
          <FloatingOverlay className={csx(styles.modalOverlay, blurredOverlay ? styles.modalOverlayBlurred : undefined, overlayClassName)} lockScroll>
            <FloatingFocusManager context={context}>
              <div
                data-fluid={fluid}
                style={{...transitionStyles}}
                className={csx(styles.modal, className)}
                ref={refs.setFloating}
                aria-labelledby={headingId}
                {...getFloatingProps()}
              >
                {(withClose || title) && (
                  <header className={styles.header}>
                    {title && <Heading id={headingId} className={styles.title} size={6}>{title}</Heading>}
                    {withClose &&
                        <IconButton onClick={() => setOpenModal(false)} name='close' size='small'
                                    variant='secondary' appearance='transparent'/>}
                  </header>
                )}
                {children}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  )
}