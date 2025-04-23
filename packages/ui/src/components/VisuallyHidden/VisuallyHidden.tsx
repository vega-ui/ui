import { FC, ReactNode, Ref } from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'
import { Slot } from '../Slot';

export interface VisuallyHiddenProps {
  className?: string
  asChild?: boolean
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
}

export const VisuallyHidden: FC<VisuallyHiddenProps> = ({
  className,
  children,
  asChild,
  ref,
  ...props
}) => {
  const Element = asChild ? Slot : 'div';

  return (
    <Element {...props} className={csx(style.visuallyHidden, className)} ref={ref}>{children}</Element>
  )
}