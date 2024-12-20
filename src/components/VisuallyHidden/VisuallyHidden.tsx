import { ElementType, forwardRef, ReactNode } from 'react';
import style from './style.module.css'
import { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../../utils';
import { IconButtonProps } from '../IconButton';
import { csx } from '../../utils/css';

export type VisuallyHiddenProps<T extends ElementType> = PolymorphicComponentPropWithRef<T, {
  className?: string
}>

type VisuallyHiddenComponent = <T extends ElementType>(props: IconButtonProps<T>) => ReactNode | null;

export const VisuallyHidden: VisuallyHiddenComponent = forwardRef(<T extends ElementType>({
  className,
  children,
  as,
}: VisuallyHiddenProps<T>, ref: PolymorphicRef<T>) => {
  const Element = as || 'div';

  return (
    <Element className={csx(style.visuallyHidden, className)} ref={ref}>{children}</Element>
  )
})