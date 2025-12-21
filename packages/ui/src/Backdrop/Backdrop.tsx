import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { FloatingOverlay, FloatingOverlayProps } from '@floating-ui/react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export interface BackdropProps extends HTMLAttributes<HTMLDivElement>, FloatingOverlayProps {
  /**
   * Enables a background blur effect
   */
  blurred?: boolean
}

/**
 * Backdrop component is a full-screen overlay behind the popovers content.
 *
 * It is responsible for visually separating the popovers from the
 * underlying page content and optionally preventing background
 * scrolling while the drawer is open.
 *
 * The component composes `FloatingOverlay` to handle scroll locking
 * and layering, and supports optional visual effects such as blur.
 */
export const Backdrop: FC<PropsWithChildren<BackdropProps>> = ({ lockScroll = true, className, blurred = true, children, ...props }) => {
  return (
    <FloatingOverlay
      data-blurred={blurred}
      lockScroll={lockScroll}
      className={csx(style.backdrop, className)}
      {...props}
    >
      {children}
    </FloatingOverlay>
  )
}