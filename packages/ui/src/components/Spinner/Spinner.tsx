import { FC, HTMLAttributes, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  variant?: 'primary' | 'secondary'
  ref?: Ref<HTMLDivElement>
}

export const Spinner: FC<SpinnerProps> = ({
  size = 3,
  variant = 'primary',
  className,
  ref,
  ...props
}) => {
  return (
    <div ref={ref} data-size={size} data-variant={variant} className={csx(style.spinner, className)} {...props} />
  )
}