'use client';
import {
  FC,
  HTMLAttributes, Ref,
} from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export interface SheetHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref forwarded to the root header element.
   * Useful for focus management, measurement, or dynamic styling.
   */
  ref?: Ref<HTMLDivElement>
}

/** The SheetHeader component defines the top section of a sheet, commonly used for titles, actions, or navigation elements. It provides structural hierarchy, improves accessibility, and supports custom styling for consistent layout and visual clarity. */
export const SheetHeader: FC<SheetHeaderProps> = ({
  className,
  children,
  ref,
  ...props
}) => {
  return (
    <div
      ref={ref}
      className={csx(style.sheetHeader, className)}
      {...props}
    >
      {children}
    </div>
  )
}