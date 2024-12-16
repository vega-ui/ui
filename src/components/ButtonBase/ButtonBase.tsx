import style from './style.module.css'
import { ComponentPropsWithRef, ElementType, forwardRef, ReactNode } from 'react';
import { csx } from '../../utils/css';

export type ButtonBaseProps<T extends ElementType = 'button'> = {
  variant?: 'primary' | 'secondary'
  appearance?: 'fill' | 'outline' | 'ghost' | 'transparent'
  disabled?: boolean
  as?: T
} & ComponentPropsWithRef<T>

type ButtonBaseComponent = <T extends ElementType = 'button'>(props: ButtonBaseProps<T>) => ReactNode | null;

export const ButtonBase: ButtonBaseComponent = forwardRef(<T extends ElementType>({
 className,
 as,
 children,
 disabled,
 variant = 'primary',
 appearance = 'fill',
 ...props
}: ButtonBaseProps<T>, ref: ComponentPropsWithRef<T>['ref']) => {
  const Element = as || 'button';

  return (
    <Element {...props} disabled={disabled} data-variant={variant} data-appearance={appearance} ref={ref} className={csx(style.buttonBase, className)}>
      {children}
    </Element>
  )
})