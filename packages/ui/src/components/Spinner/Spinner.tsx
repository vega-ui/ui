import { forwardRef, HTMLAttributes } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  variant?: 'primary' | 'secondary'
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(({
  size = 3,
  variant = 'primary',
  className,
  ...props
}, ref) => {
  return (
    <div ref={ref} data-size={size} data-variant={variant} className={csx(style.spinner, className)} {...props} />
  )
})