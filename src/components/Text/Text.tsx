import { ElementType, forwardRef, ReactNode } from 'react';

import style from './style.module.css'
import { csx } from '../../utils/css';
import { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../../utils';

export type TextProps<T extends ElementType = 'span'> = PolymorphicComponentPropWithRef<T, {
  className?: string
  as?: T
  children?: ReactNode | ReactNode[]
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  fontWeight?: 400 | 500 | 700 | 900
}>

type TextComponent = <T extends ElementType>(props: TextProps<T>) => ReactNode | null;

export const Text: TextComponent = forwardRef(<T extends ElementType>({
  as, 
  className, 
  size = 3, 
  fontWeight, 
  children, 
  ...props 
}: TextProps<T>, ref: PolymorphicRef<T>) => {
  const Element = as || 'span';

  return (
    <Element className={csx(style.text, className)} data-fontweight={fontWeight} data-size={size} {...props} ref={ref}>
      {children}
    </Element>
  );
})