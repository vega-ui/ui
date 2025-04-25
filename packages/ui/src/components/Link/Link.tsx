'use client';
import { AnchorHTMLAttributes, FC, Ref } from 'react';

import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { Text, TextProps } from '../Text';
import { Slot } from '../Slot';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Custom class name applied to the link.
   * Useful for design token styling or scoped overrides.
   */
  className?: string

  /**
   * The visible text content of the link.
   * Only plain string content is supported here.
   */
  children?: string

  /**
   * Visual size of the link text.
   * Inherits values from `TextProps['size']`, typically based on a design system scale.
   */
  size?: TextProps['size']

  /**
   * Font weight of the link text.
   * Inherits from `TextProps['fontWeight']`.
   * Allows control over link emphasis.
   */
  fontWeight?: TextProps['fontWeight']

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
  size = 3,
  fontWeight,
  children,
  ref,
  ...props
}) => {
  const Element = asChild ? Slot : 'a';

  return (
    <Element ref={ref} className={csx(style.link, className)} {...props} data-fontweight={fontWeight} data-size={size}>
      <Text size={size} fontWeight={fontWeight}>
        {children}
      </Text>
    </Element>
  );
}