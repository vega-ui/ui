import { FC, HTMLAttributes, ReactNode, Ref } from 'react';

import { csx } from '@adara-cs/utils';
import style from './style.module.css'
import { Slot } from '../Slot';

export type TextSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Optional class name applied to the text element.
   * Useful for design tokens, theming, or scoped overrides.
   */
  className?: string

  /**
   * Content of the text component.
   * Can be plain text, formatted nodes, or nested elements.
   */
  children?: ReactNode | ReactNode[]

  /**
   * Visual size of the text, typically mapped to the design system’s type scale.
   */
  size?: TextSize

  /**
   * If true, renders the text as a child component using `Slot`.
   * Useful for compatibility with native elements or other components.
   */
  asChild?: boolean

  /**
   * Font weight applied to the text.
   * Common values:
   *
   * - 400: Regular
   * - 500: Medium
   * - 600: Semi-bold
   * - 700: Bold
   * - 900: Extra bold
   */
  fontWeight?: 400 | 500 | 600 | 700 | 900

  /**
   * Ref to the underlying `<span>` or slotted element.
   * Useful for measuring, focusing, or DOM manipulation.
   */
  ref?: Ref<HTMLSpanElement>
}

/** Text is a UI component used to display readable content, such as labels, descriptions, or body text, with customizable styling */
export const Text: FC<TextProps> = ({
  asChild,
  className,
  size = 3,
  fontWeight,
  children,
  ref,
  ...props
}) => {
  const Element = asChild ? Slot : 'span';

  return (
    <Element className={csx(style.text, className)} data-fontweight={fontWeight} data-size={size} {...props} ref={ref}>
      {children}
    </Element>
  );
}