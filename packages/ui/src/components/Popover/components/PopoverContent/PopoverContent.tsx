'use client';

import { FC, HTMLAttributes, ReactNode, Ref } from 'react';
import { FloatingFocusManager, FloatingOverlay, useTransitionStyles } from '@floating-ui/react';
import { csx, mergeProps, mergeRefs } from '@vega-ui/utils';
import styles from './style.module.css';
import { usePopoverContext } from '../../hooks';

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional class name applied to the popover content container.
   */
  className?: string

  /**
   * The content to display inside the popover.
   */
  children?: ReactNode

  /**
   * If true, prevents background scrolling while the popover is open.
   */
  lockScroll?: boolean

  /**
   * Applies a visual shadow to the component container.
   * Adds elevation and depth, visually separating the content from the background.
   */
  shadowed?: boolean

  /**
   * Renders the popover as an overlay above the main content.
   */
  overlaid?: boolean

  /**
   * Applies a blurred background overlay behind the popover.
   * Enhances visual focus and contrast.
   */
  blurredOverlay?: boolean

  /**
   * Ref forwarded to the popover content element.
   * Useful for focus management, animations, or measuring position.
   */
  ref?: Ref<HTMLDivElement>
}

/** The PopoverContent component defines the visible area of a Popover, supporting scroll locking, overlays, and visual effects like background blur, while rendering custom content inside a floating or overlaid panel */
export const PopoverContent: FC<PopoverContentProps> = ({
  ref,
  blurredOverlay,
  overlaid,
  shadowed = true,
  className,
  children,
  lockScroll,
  ...props
}) => {
  const { open, context, contentRef, contentProps = {}, contentStyles } = usePopoverContext()

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
  });

  const content = (
    <FloatingFocusManager context={context}>
      <div
        ref={mergeRefs([contentRef, ref])}
        style={{ ...transitionStyles, ...contentStyles }}
        data-shadowed={shadowed}
        className={csx(styles.popover, className)}
        {...mergeProps(contentProps, props)}
      >
        {children}
      </div>
    </FloatingFocusManager>
  )

  return (
    <>
      {open && (
        overlaid ? (
          <FloatingOverlay lockScroll={lockScroll} className={csx(styles.popoverOverlay, blurredOverlay ? styles.popoverOverlayBlurred : undefined)}>
            {content}
          </FloatingOverlay>
        ) : content
      )}
    </>
  )
}