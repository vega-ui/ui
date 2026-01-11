'use client';
import {
  FC,
  HTMLAttributes, Ref,
} from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export interface SheetHandleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref forwarded to the root handle element.
   * Useful for focus management, gesture tracking, or integration with animation libraries.
   */
  ref?: Ref<HTMLDivElement>
}

/** The SheetHandle component provides a visual and interactive grip element at the top of a sheet, enhancing usability by indicating drag affordance and improving discoverability of gesture-based interactions. */
export const SheetHandle: FC<SheetHandleProps> = ({
  className,
  ref,
  ...props
}) => {
  return (
    <div ref={ref} className={csx(style.handle, className)} {...props} />
  )
}