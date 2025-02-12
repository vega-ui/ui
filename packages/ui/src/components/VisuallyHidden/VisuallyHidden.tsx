import { ElementType, ReactNode } from 'react';
import { csx } from '@adara-cs/utils';
import { PolymorphicComponentPropWithRef } from '@adara-cs/types';
import style from './style.module.css'

export type VisuallyHiddenProps<T extends ElementType> = PolymorphicComponentPropWithRef<T, {
  className?: string
}>

type VisuallyHiddenComponent = <T extends ElementType>(props: VisuallyHiddenProps<T>) => ReactNode | null;

export const VisuallyHidden: VisuallyHiddenComponent = <T extends ElementType>({
  className,
  children,
  as,
  ref,
  ...props
}: VisuallyHiddenProps<T>) => {
  const Element = as || 'div';

  return (
    <Element {...props} className={csx(style.visuallyHidden, className)} ref={ref}>{children}</Element>
  )
}