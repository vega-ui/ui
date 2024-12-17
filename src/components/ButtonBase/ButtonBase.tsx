import style from './style.module.css'
import {
  ElementType,
  forwardRef,
  ReactNode
} from 'react';
import { csx } from '../../utils/css';
import { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../../utils';

export type ButtonBaseProps<T extends ElementType> = PolymorphicComponentPropWithRef<
  T,
  {
    variant?: 'primary' | 'secondary'
    appearance?: 'fill' | 'outline' | 'ghost' | 'transparent'
    disabled?: boolean
  }
>;

type ButtonBaseComponent = <T extends ElementType>(props: ButtonBaseProps<T>) => ReactNode | null;

export const ButtonBase: ButtonBaseComponent = forwardRef(<T extends ElementType>({
 className,
 as,
 children,
 disabled,
 variant = 'primary',
 appearance = 'fill',
 ...props
}: ButtonBaseProps<T>, ref: PolymorphicRef<T>) => {
  const Element = as || 'button';

  return (
    <Element {...props} disabled={disabled} data-variant={variant} data-appearance={appearance} ref={ref} className={csx(style.buttonBase, className)}>
      {children}
    </Element>
  )
})