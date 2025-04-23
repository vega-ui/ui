'use client';

import { FC, ReactNode, Ref } from 'react';
import { FloatingFocusManager, FloatingOverlay, useTransitionStyles } from '@floating-ui/react';
import { csx, mergeRefs } from '@adara-cs/utils';
import styles from './style.module.css';
import { usePopoverContext } from '../../hooks';

export interface PopoverContentProps {
  className?: string
  children?: ReactNode
  lockScroll?: boolean
  overlaid?: boolean
  blurredOverlay?: boolean
  ref?: Ref<HTMLDivElement>
}

export const PopoverContent: FC<PopoverContentProps> = ({
  ref,
  blurredOverlay,
  overlaid,
  className,
  children,
  lockScroll,
}) => {
  const { open, context, contentRef, contentProps, contentStyles } = usePopoverContext()

  const { styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
  });

  const content = (
    <FloatingFocusManager context={context}>
      <div
        ref={mergeRefs([contentRef, ref])}
        style={{ ...transitionStyles, ...contentStyles }}
        className={csx(styles.popover, className)}
        {...contentProps}
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