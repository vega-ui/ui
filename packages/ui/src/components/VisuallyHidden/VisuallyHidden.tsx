import { ComponentPropsWithRef, ElementType } from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'

export type VisuallyHiddenProps<T extends ElementType = 'div'> = {
  className?: string
  as?: T
} & Omit<ComponentPropsWithRef<T>, 'as'>;

export const VisuallyHidden = <T extends ElementType = 'div'>({
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