'use client';
import {
  FC, HTMLAttributes, PropsWithChildren, Ref,
} from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export interface SheetMainProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional class name for custom styling of the sheet main area.
   */
  className?: string

  /**
   * Ref forwarded to the root main content element.
   * Useful for focus management, scrolling, or measuring content dimensions.
   */
  ref?: Ref<HTMLDivElement>
}

/** The SheetMain component represents the primary content area of a sheet. It provides a flexible, scrollable region for displaying structured content, forms, or interactive elements, ensuring consistent layout and seamless integration with header, footer, and handle components. */
export const SheetMain: FC<PropsWithChildren<SheetMainProps>> = ({
  className,
  children,
  ref,
  ...props
}) => {
  return (
    <div ref={ref} className={csx(style.sheetMain, className)} {...props}>
      {children}
    </div>
  )
}