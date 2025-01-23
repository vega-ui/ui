'use client';
import {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'

export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
  scrollable?: boolean
  touchAction?: CSSProperties['touchAction']
  className?: string
}

export const DrawerContent = forwardRef<HTMLDivElement, PropsWithChildren<DrawerContentProps>>(({
  className,
  scrollable,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={csx(style.drawerContent, className)}
      data-scrollable={scrollable}
      {...props}
    >
      {children}
    </div>
  )
})