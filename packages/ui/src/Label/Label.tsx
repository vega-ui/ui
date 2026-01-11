import { FC, LabelHTMLAttributes } from 'react';

import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { Text, TextProps } from '../Text';
import { sizeMapper } from './helpers';
import { LabelSize } from './types';

export interface LabelProps extends
  Omit<TextProps, keyof LabelHTMLAttributes<HTMLLabelElement> | 'size'>,
  LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Visual size of the label text.
   * Typically maps to type scale values in a design system.
   */
  size?: LabelSize

  /**
   * Associates the label with an input by its `id`.
   * Enables native focus and screen reader linking.
   */
  htmlFor?: string
}

/** A Label is a UI component that provides descriptive text to identify or explain the purpose of another element, such as a form input field, button, or checkbox, improving accessibility and user understanding */
export const Label: FC<LabelProps> = ({ className, size = 'md', htmlFor, fontWeight = 500, children, ...props }) => {
  return (
    <Text
      asChild
      className={csx(style.label, className)}
      size={sizeMapper(size)}
      fontWeight={fontWeight}
      {...props}
    >
      <label htmlFor={htmlFor}>{children}</label>
    </Text>
  );
}