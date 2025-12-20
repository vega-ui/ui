'use client';
import {
  FC,
  HTMLAttributes, Ref,
} from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom class name applied to the header content container.
   */
  className?: string

  /**
   * Ref forwarded to the drawer header element.
   * Useful for measuring, scrolling into view, or focus management.
   */
  ref?: Ref<HTMLDivElement>
}

/** The DrawerHeader component defines the top section of a drawer, typically used to display a title, actions, or a close button, and supports custom layout through class names and wrappers */
export const DrawerHeader: FC<DrawerHeaderProps> = ({
  className,
  children,
  ref,
  ...props
}) => {
  return (
    <div ref={ref} className={csx(style.header, className)} {...props}>
      {children}
    </div>
  )
}