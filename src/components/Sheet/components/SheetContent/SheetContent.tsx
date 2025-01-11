import {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import { csx } from '../../../../utils/css';
import style from './style.module.css'

export interface SheetContentProps extends HTMLAttributes<HTMLDivElement> {
  scrollable?: boolean
  touchAction?: CSSProperties['touchAction']
  className?: string
}

export const SheetContent = forwardRef<HTMLDivElement, PropsWithChildren<SheetContentProps>>(({
  className,
  scrollable,
  children,
  ...props
}, ref) => {
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
})