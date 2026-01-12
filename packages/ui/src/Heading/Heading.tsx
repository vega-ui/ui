import { ElementType, FC, HTMLAttributes, Ref } from 'react';

import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { sizeMapper } from './helpers';
import { HeadingAs, HeadingSize } from './types';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * The HTML heading tag to render (e.g., 'h1', 'h2').
   * Defines semantic structure and accessibility level.
   */
  as?: HeadingAs

  /**
   * Visual size of the heading, independent of the `as` tag.
   * Typically mapped to a design system's type scale.
   * Accepts values from 1 (smallest) to 11 (largest).
   */
  size?: HeadingSize

  /**
   * Font weight of the heading text.
   *
   * - 400: Regular
   * - 500: Medium
   * - 600: Semi-bold
   * - 700: Bold
   * - 900: Extra bold
   */
  fontWeight?: 400 | 500 | 600 | 700 | 900

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
    <Element
      ref={ref}
      className={csx(style.heading, className)}
      data-font-weight={fontWeight}
      data-size={headingSize}
      {...props}>
      {children}
    </Element>
  );
}