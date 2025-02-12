import style from './style.module.css'
import {
  ElementType,
  ReactNode
} from 'react';
import { csx } from '@adara-cs/utils';
import { PolymorphicComponentPropWithRef } from '@adara-cs/types';

export type ButtonBaseProps<T extends ElementType> = PolymorphicComponentPropWithRef<T, {
    variant?: 'primary' | 'secondary'
    appearance?: 'fill' | 'outline' | 'ghost' | 'transparent'
    disabled?: boolean
    className?: string
}>;

type ButtonBaseComponent = <T extends ElementType = 'button'>(props: ButtonBaseProps<T>) => ReactNode | null;

export const ButtonBase: ButtonBaseComponent = <T extends ElementType>({
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
    <Element {...props} disabled={disabled} data-variant={variant} data-appearance={appearance} ref={ref} className={csx(style.buttonBase, className)}>
      {children}
    </Element>
  )
}