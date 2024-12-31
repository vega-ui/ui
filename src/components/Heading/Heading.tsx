import { forwardRef, ReactElement, ReactNode } from 'react';

import style from './style.module.css'
import { csx } from '../../utils/css';
import { sizeMapper } from './utils';
import { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../../utils';

type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps<T extends HeadingAs = 'h1'> = PolymorphicComponentPropWithRef<T, {
  className?: string
  as?: T
  children?: string | string[] | ReactElement
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  fontWeight?: 400 | 500 | 700 | 900
}>

type HeadingComponent = <T extends HeadingAs = 'h1'>(props: HeadingProps<T>) => ReactNode | null;

export const Heading: HeadingComponent = forwardRef(<T extends HeadingAs>({ as, className, size, fontWeight, children, ...props }: HeadingProps<T>, ref: PolymorphicRef<T>) => {
  const Element = as || 'h1';
  const headingSize = size !== undefined ? size : Element ? sizeMapper(Element) : 3;

  return (
    <Element className={csx(style.heading, className)} data-fontweight={fontWeight} data-size={headingSize} {...props} ref={ref}>
      {children}
    </Element>
  );
})