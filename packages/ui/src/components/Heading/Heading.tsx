import { ElementType, FC, HTMLAttributes, ReactNode, Ref } from 'react';

import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { sizeMapper } from './utils';

type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * The HTML heading tag to render (e.g., 'h1', 'h2').
   * Defines semantic structure and accessibility level.
   */
  as: HeadingAs

  /**
   * Custom class name applied to the heading element.
   * Useful for style overrides or scoped design tokens.
   */
  className?: string

  /**
   * The content of the heading.
   * Can be text, icons, or any React nodes.
   */
  children?: ReactNode | ReactNode[]

  /**
   * Visual size of the heading, independent of the `as` tag.
   * Typically mapped to a design system's type scale.
   * Accepts values from 1 (smallest) to 11 (largest).
   */
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

  /**
   * Font weight of the heading text.
   *
   * - 400: Regular
   * - 500: Medium
   * - 700: Bold
   * - 900: Extra bold
   */
  fontWeight?: 400 | 500 | 700 | 900

  /**
   * Ref to the native HTML heading element.
   * Useful for DOM access or focus management.
   */
  ref?: Ref<HTMLHeadingElement>
}

/** The Heading component renders a semantic HTML heading (h1–h6) with customizable visual size and font weight, enabling flexible typography while preserving document structure */
export const Heading: FC<HeadingProps> = ({ as, className, size, fontWeight, children, ref, ...props }) => {
  const Element: ElementType = as || 'h1';
  const headingSize = size !== undefined ? size : Element ? sizeMapper(Element) : 3;

  return (
    <Element className={csx(style.heading, className)} data-fontweight={fontWeight} data-size={headingSize} {...props} ref={ref}>
      {children}
    </Element>
  );
}