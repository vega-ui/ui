'use client';
import { FC, ReactNode, Ref } from 'react';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useTransitionStyles
} from '@floating-ui/react';
import { csx, mergeRefs } from '@adara-cs/utils';
import styles from './style.module.css';
import { useModalContext } from '../../hooks';

export interface ModalContentProps {
  blurredOverlay?: boolean
  overlayClassName?: string
  fluid?: boolean
  className?: string
  ref?: Ref<HTMLDivElement>
  children?: ReactNode
}

export const ModalContent: FC<ModalContentProps> = ({
  overlayClassName,
  blurredOverlay = true,
  fluid,
  className,
  ref,
  children,
}) => {
  const { contentProps, contentRef, context } = useModalContext()

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
    <FloatingPortal>
      {isMounted && (
        <FloatingOverlay data-blurred={blurredOverlay} className={csx(styles.modalOverlay, overlayClassName)} lockScroll>
          <FloatingFocusManager context={context}>
            <div
              data-fluid={fluid}
              style={{...transitionStyles}}
              className={csx(styles.modal, className)}
              ref={mergeRefs([contentRef, ref])}
              {...contentProps}
            >
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  )
}