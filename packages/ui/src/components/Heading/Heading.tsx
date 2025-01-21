import { ElementType, forwardRef, HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';

import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { sizeMapper } from './utils';

type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps<T extends HeadingAs = 'h1'> extends HTMLAttributes<HTMLHeadingElement> {
  as: T
  className?: string
  children?: string | string[] | ReactElement
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  fontWeight?: 400 | 500 | 700 | 900
}

type HeadingComponent = <T extends HeadingAs = 'h1'>(props: HeadingProps<T>) => ReactNode | null;

export const Heading: HeadingComponent = forwardRef(<T extends HeadingAs>({ as, className, size, fontWeight, children, ...props }: HeadingProps<T>, ref: Ref<HTMLHeadingElement>) => {
  const Element: ElementType = as || 'h1';
  const headingSize = size !== undefined ? size : Element ? sizeMapper(Element) : 3;

  return (
    <Element className={csx(style.heading, className)} data-fontweight={fontWeight} data-size={headingSize} {...props} ref={ref}>
      {children}
    </Element>
  );
})