'use client';
import {
  CSSProperties,
  FC,
  HTMLAttributes, Ref,
} from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'

export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
  scrollable?: boolean
  touchAction?: CSSProperties['touchAction']
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const DrawerContent: FC<DrawerContentProps> = ({
  className,
  scrollable,
  children,
  ref,
  ...props
}) => {
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
}