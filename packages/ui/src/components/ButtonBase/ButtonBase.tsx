import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { Slot } from '../Slot';
import { ButtonHTMLAttributes, FC, ReactNode, Ref } from 'react';

export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  appearance?: 'fill' | 'outline' | 'ghost' | 'transparent'
  disabled?: boolean
  className?: string
  asChild?: boolean
  children?: ReactNode
  ref?: Ref<HTMLButtonElement>
}

export const ButtonBase: FC<ButtonBaseProps> = ({
 className,
 asChild,
 children,
 disabled,
 variant = 'primary',
 appearance = 'fill',
 ref,
 ...props
}) => {
  const Element = asChild ? Slot : 'button';

  return (
    <Element
      {...props}
      disabled={disabled}
      data-variant={variant}
      data-appearance={appearance}
      ref={ref}
      className={csx(style.buttonBase, className)}
    >
      {children}
    </Element>
  )
}