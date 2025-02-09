import { forwardRef, HTMLAttributes } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary'
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(({
  size = 'medium',
  variant = 'primary',
  className,
  ...props
}, ref) => {
  return (
    <div ref={ref} data-size={size} data-variant={variant} className={csx(style.spinner, className)} {...props} />
  )
})