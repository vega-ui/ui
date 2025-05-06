'use client';
import {
  FC,
  HTMLAttributes, Ref,
} from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export interface SheetHandleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  ref?: Ref<HTMLDivElement>
}

export const SheetHandle: FC<SheetHandleProps> = ({
  className,
  ref,
  ...props
}) => {
  return (
    <div ref={ref} className={csx(style.handle, className)} {...props} />
  )
}