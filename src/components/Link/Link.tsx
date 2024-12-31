import { ElementType, forwardRef, ReactNode } from 'react';

import style from './style.module.css'
import { csx } from '../../utils/css';
import { Text, TextProps } from '../Text';
import { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../../utils';

export type LinkProps<T extends ElementType> = PolymorphicComponentPropWithRef<T, {
  className?: string
  children?: string;
  size?: TextProps['size']
  fontWeight?: TextProps['fontWeight']
}>

type LinkComponent = <T extends ElementType = 'a'>(props: LinkProps<T>) => ReactNode | null;

export const Link: LinkComponent = forwardRef(<T extends ElementType>({ as, className, size = 3, fontWeight, children, ...props }: LinkProps<T>, ref: PolymorphicRef<T>) => {
  const Element = as || 'a';

  return (
    <Element ref={ref} className={csx(style.link, className)} {...props} data-fontweight={fontWeight} data-size={size}>
      <Text size={size} fontWeight={fontWeight}>
        {children}
      </Text>
    </Element>
  );
})