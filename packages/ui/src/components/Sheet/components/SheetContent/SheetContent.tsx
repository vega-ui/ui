'use client';
import {
  CSSProperties, FC,
  HTMLAttributes, PropsWithChildren, Ref,
} from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'

export interface SheetContentProps extends HTMLAttributes<HTMLDivElement> {
  scrollable?: boolean
  touchAction?: CSSProperties['touchAction']
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const SheetContent: FC<PropsWithChildren<SheetContentProps>> = ({
  className,
  scrollable,
  children,
  ref,
  ...props
}) => {
  return (
    <div
      ref={ref}
      className={csx(style.sheetContent, className)}
      data-scrollable={scrollable}
      {...props}
    >
      {children}
    </div>
  )
}