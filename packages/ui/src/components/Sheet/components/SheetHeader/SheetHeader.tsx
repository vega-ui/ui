'use client';
import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'

export interface SheetHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const SheetHeader = forwardRef<HTMLDivElement, PropsWithChildren<SheetHeaderProps>>(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={csx(style.sheetHeader, className)}
      {...props}
    >
      {children}
    </div>
  )
})