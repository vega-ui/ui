import { FC, ReactElement, ReactNode, Ref, useState } from 'react';
import { csx } from '../../utils/css';
import styles from './style.module.css'
import {
  autoUpdate,
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
  open,
  onOpenChange,
  children
}) => {
  const [isOpen, setIsOpen] = useState(open ?? false);

  const isOpenModal = open ?? isOpen;
  const setOpenModal = onOpenChange ?? setIsOpen;

  const { refs, context } = useFloating({
    whileElementsMounted: autoUpdate,
    open: isOpenModal,
    onOpenChange: setOpenModal,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'dialog' });

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
      {isOpenModal && (
        <FloatingPortal>
          <FloatingOverlay lockScroll className={csx(styles.modalOverlay, blurredOverlay ? styles.modalOverlayBlurred : undefined, overlayClassName)}>
            <FloatingFocusManager context={context}>
              <div
                data-fluid={fluid}
                ref={refs.setFloating}
                style={{ ...transitionStyles }}
                className={csx(styles.modal, className)}
                {...getFloatingProps()}
              >
                {(withClose || title) && (
                  <header className={styles.header}>
                    {title && <Heading className={styles.title} size={6}>{title}</Heading>}
                    {withClose &&
                        <IconButton onClick={() => setOpenModal(false)} ref={dismiss.floating} name='close' size='small'
                                    variant='secondary' appearance='transparent'/>}
                  </header>
                )}
                {children}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </>
  )
}