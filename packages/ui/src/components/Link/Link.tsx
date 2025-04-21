'use client';
import { ComponentPropsWithRef, ElementType } from 'react';

import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { Text, TextProps } from '../Text';

export type LinkProps<T extends ElementType = 'a'> = {
  className?: string
  children?: string;
  size?: TextProps['size']
  fontWeight?: TextProps['fontWeight']
  as?: T
} & Omit<ComponentPropsWithRef<T>, 'as'>

export const Link = <T extends ElementType = 'a'>({
  as,
  className,
  size = 3,
  fontWeight,
  children,
  ref,
  ...props
}: LinkProps<T>) => {
  const Element = as || 'a';

  return (
    <Element ref={ref} className={csx(style.link, className)} {...props} data-fontweight={fontWeight} data-size={size}>
      <Text size={size} fontWeight={fontWeight}>
        {children}
      </Text>
    </Element>
  );
}