'use client';
import { AnchorHTMLAttributes, FC, Ref } from 'react';

import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { Slot } from '../Slot';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Renders the link as a child component using a `Slot` (e.g., Radix UI `asChild`).
   * Useful for composing links with routing libraries like Next.js (`<Link>`) or `react-router`.
   */
  asChild?: boolean

  /**
   * Ref to the underlying anchor (`<a>`) element.
   * Useful for DOM access, focus control, or measurement.
   */
  ref?: Ref<HTMLAnchorElement>
}

/** A Link is a UI component that allows users to navigate to another page, section, or resource, typically styled as text or buttons that can be clicked or tapped. */
export const Link: FC<LinkProps> = ({
  asChild,
  className,
  children,
  ref,
  ...props
}) => {
  const Element = asChild ? Slot : 'a';

  return (
    <Element ref={ref} className={csx(style.link, className)} {...props}>
      {children}
    </Element>
  );
}