import { ElementType, forwardRef, ReactNode } from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { PolymorphicComponentPropWithRef, PolymorphicRef } from '@adara-cs/types';

export type VisuallyHiddenProps<T extends ElementType> = PolymorphicComponentPropWithRef<T, {
  className?: string
}>

type VisuallyHiddenComponent = <T extends ElementType>(props: VisuallyHiddenProps<T>) => ReactNode | null;

export const VisuallyHidden: VisuallyHiddenComponent = forwardRef(<T extends ElementType>({
  className,
  children,
  as,
  ...props
}: VisuallyHiddenProps<T>, ref: PolymorphicRef<T>) => {
  const Element = as || 'div';

  return (
    <Element {...props} className={csx(style.visuallyHidden, className)} ref={ref}>{children}</Element>
  )
})