import { ComponentPropsWithRef } from 'react';

import style from './style.module.css'
import { csx } from '../../utils/css';
import { sizeMapper } from './utils';

type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps<T extends HeadingAs = 'h1'> {
  className?: string
  as?: T
  children?: string
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  fontWeight?: 400 | 500 | 700 | 900
}

export const Heading = <T extends HeadingAs = 'h1'>({ as, className, size, fontWeight, children }: HeadingProps<T> & Omit<ComponentPropsWithRef<T>, keyof HeadingProps<T>>) => {
  const Element = as || 'h1';
  const headingSize = size !== undefined ? size : Element ? sizeMapper(Element) : 3;

  return (
    <Element className={csx(style.heading, className)} data-fontweight={fontWeight} data-size={headingSize}>
      {children}
    </Element>
  );
}