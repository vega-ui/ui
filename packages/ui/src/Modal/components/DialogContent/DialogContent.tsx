'use client';
import { FC, ReactNode, Ref } from 'react';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useTransitionStyles
} from '@floating-ui/react';
import { csx, mergeRefs } from '@vega-ui/utils';
import styles from './style.module.css';
import { useDialogContext } from '../../contexts';
 
export interface DialogContentProps {
  /**
   * Applies a blurred background overlay behind the dialog content.
   * Enhances visual focus on the dialog by softening the background.
   */
  blurredOverlay?: boolean

  /**
   * Custom class name applied to the overlay element.
   * Useful for styling transitions or layout wrappers.
   */
  overlayClassName?: string

  /**
   * Renders the dialog as an overlay on top of the page content.
   * Prevents it from affecting layout flow.
   */
  overlaid?: boolean

  /**
   * Applies a visual shadow to the dialog panel.
   * Adds depth and separation from the background.
   */
  shadowed?: boolean

  /**
   * Makes the dialog fluid, allowing it to stretch responsively within its container.
   * Useful for adapting to different screen sizes or layouts.
   */
  fluid?: boolean

  /**
   * Custom class name applied to the dialog content container.
   */
  className?: string

  /**
   * Ref forwarded to the dialog’s root element.
   * Useful for managing focus, animations, or measurements.
   */
  ref?: Ref<HTMLDivElement>

  /**
   * The children nodes to render inside the dialog.
   */
  children?: ReactNode
}

/** The DialogContent component is the main container for a dialog dialog’s content, supporting layout options like blurred overlays, shadows, fluid width, and overlaid positioning to control its appearance and behavior */
export const DialogContent: FC<DialogContentProps> = ({
  overlayClassName,
  blurredOverlay = true,
  overlaid = true,
  shadowed = true,
  fluid,
  className,
  ref,
  children,
}) => {
  const { contentProps, contentRef, context } = useDialogContext()

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
        <FloatingOverlay
          data-overlaid={overlaid}
          data-blurred={blurredOverlay}
          className={csx(styles.dialogOverlay, overlayClassName)}
          lockScroll
        >
          <FloatingFocusManager context={context}>
            <div
              data-fluid={fluid}
              data-shadowed={shadowed}
              style={{ ...transitionStyles }}
              className={csx(styles.dialog, className)}
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