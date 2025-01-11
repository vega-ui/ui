import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import { csx } from '../../../../utils/css';
import style from './style.module.css'

export interface SheetHandleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const SheetHandle = forwardRef<HTMLDivElement, PropsWithChildren<SheetHandleProps>>(({
  className,
  ...props
}, ref) => {
  return (
    <div ref={ref} className={csx(style.handle, className)} {...props} />
  )
})