'use client';
import {
  FC,
  HTMLAttributes, Ref,
} from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export interface SheetHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  ref?: Ref<HTMLDivElement>
}

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