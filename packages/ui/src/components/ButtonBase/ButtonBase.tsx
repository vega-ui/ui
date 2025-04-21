import style from './style.module.css'
import {
  ComponentPropsWithRef,
  ElementType,
} from 'react';
import { csx } from '@adara-cs/utils';

export type ButtonBaseProps<T extends ElementType> = {
  variant?: 'primary' | 'secondary'
  appearance?: 'fill' | 'outline' | 'ghost' | 'transparent'
  disabled?: boolean
  className?: string
  as?: T
} & Omit<ComponentPropsWithRef<T>, 'as'>;

export const ButtonBase = <T extends ElementType = 'button'>({
 className,
 as,
 children,
 disabled,
 variant = 'primary',
 appearance = 'fill',
 ref,
 ...props
}: ButtonBaseProps<T>) => {
  const Element = as || 'button';

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