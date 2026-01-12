'use client';

import { FC, Fragment, HTMLAttributes, Ref } from 'react';
import { FloatingFocusManager, useTransitionStatus } from '@floating-ui/react';
import { csx, mergeProps, mergeRefs } from '@vega-ui/utils';
import styles from './style.module.css';
import { usePopoverContext } from '../../contexts';

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Applies a visual shadow to the component container.
   * Adds elevation and depth, visually separating the content from the background.
   */
  shadowed?: boolean

  /**
   * Ref forwarded to the popover content element.
   * Useful for focus management, animations, or measuring position.
   */
  ref?: Ref<HTMLDivElement>
}

/** The PopoverContent component defines the visible area of a Popover, supporting scroll locking, overlays, and visual effects like background blur, while rendering custom content inside a floating or overlaid panel */
export const PopoverContent: FC<PopoverContentProps> = ({
  ref,
  shadowed = true,
  className,
  children,
  style,
  ...props
}) => {
  const { context, contentProps = {}, contentStyles } = usePopoverContext()

  const { status, isMounted } = useTransitionStatus(context);

  return (
    <Fragment>
      {isMounted && (
        <FloatingFocusManager context={context}>
          <div
            ref={mergeRefs([context?.refs.setFloating, ref])}
            style={{ ...contentStyles, ...style }}
            data-shadowed={shadowed}
            data-status={status}
            className={csx(styles.content, className)}
            {...mergeProps(contentProps, props)}
          >
            {children}
          </div>
        </FloatingFocusManager>
      )}
    </Fragment>
  )
}