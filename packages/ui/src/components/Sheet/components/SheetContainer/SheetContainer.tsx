'use client';
import {
  FC,
  HTMLAttributes,
  PropsWithChildren, Ref,
} from 'react';
import { csx } from '@vega-ui/utils';
import styles from './style.module.css'

type TransitionStatus = 'unmounted' | 'initial' | 'open' | 'close'

export interface SheetContainerProps extends HTMLAttributes<HTMLDivElement> {
  status?: TransitionStatus
  dragging?: boolean
  className?: string
  offset?: number
  shadow?: boolean
  ref?: Ref<HTMLDivElement>
}

export const SheetContainer: FC<PropsWithChildren<SheetContainerProps>> = ({
  className,
  dragging,
  status,
  offset,
  shadow,
  children,
  style,
  ref,
  ...props
}) => {
  return (
    <div
      data-status={status}
      data-dragging={dragging}
      data-shadow={shadow}
      ref={ref}
      style={{ ...style, ...(status === 'open' ? { transform: `translateY(${offset}px)`} : {}) }}
      className={csx(styles.sheet, className)}
      {...props}
    >
      {children}
    </div>
  )
}