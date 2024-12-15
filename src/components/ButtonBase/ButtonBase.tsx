import style from './style.module.css'
import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from 'react';
import { csx } from '../../utils/css';

export interface ButtonBaseProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: 'primary' | 'secondary'
  appearance?: 'fill' | 'outline' | 'ghost' | 'transparent'
  disabled?: boolean
}

export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(({ className, children, disabled, variant = 'primary', appearance = 'fill', ...props }, ref) => {
  return (
    <button {...props} disabled={disabled} data-variant={variant} data-appearance={appearance} ref={ref} className={csx(style.buttonBase, className)}>
      {children}
    </button>
  )
})