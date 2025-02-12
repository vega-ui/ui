'use client';
import { ElementType, ReactNode } from 'react';

import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { Text, TextProps } from '../Text';
import { PolymorphicComponentPropWithRef } from '@adara-cs/types';

export type LinkProps<T extends ElementType> = PolymorphicComponentPropWithRef<T, {
  className?: string
  children?: string;
  size?: TextProps['size']
  fontWeight?: TextProps['fontWeight']
}>

type LinkComponent = <T extends ElementType = 'a'>(props: LinkProps<T>) => ReactNode | null;

export const Link: LinkComponent = <T extends ElementType>({ as, className, size = 3, fontWeight, children, ref, ...props }: LinkProps<T>) => {
  const Element = as || 'a';

  return (
    <Element ref={ref} className={csx(style.link, className)} {...props} data-fontweight={fontWeight} data-size={size}>
      <Text size={size} fontWeight={fontWeight}>
        {children}
      </Text>
    </Element>
  );
}