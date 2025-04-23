import { FC, ReactNode } from 'react';

import style from './style.module.css'
import { csx } from '@adara-cs/utils';
import { Text, TextProps } from '../Text';
import { sizeMapper } from './utils';

export interface LabelProps {
  /**
   * Optional class name applied to the `<label>` element.
   * Useful for design system overrides or scoped styles.
   */
  className?: string

  /**
   * The content of the label.
   * Can include plain text, inline elements, or formatting tags.
   */
  children?: ReactNode | ReactNode[]

  /**
   * Visual size of the label text.
   * Typically maps to type scale values in a design system.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Font weight of the label text.
   * Inherits allowed values from `TextProps['fontWeight']`.
   */
  fontWeight?: TextProps['fontWeight']

  /**
   * Associates the label with an input by its `id`.
   * Enables native focus and screen reader linking.
   */
  htmlFor?: string
}

/** A Label is a UI component that provides descriptive text to identify or explain the purpose of another element, such as a form input field, button, or checkbox, improving accessibility and user understanding */
export const Label: FC<LabelProps> = ({ className, size = 'medium', htmlFor, fontWeight = 500, children }) => {
  return (
    <Text asChild className={csx(style.label, className)} size={sizeMapper(size)} fontWeight={fontWeight}>
      <label htmlFor={htmlFor}>{children}</label>
    </Text>
  );
}