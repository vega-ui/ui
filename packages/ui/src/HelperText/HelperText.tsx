import { FC } from 'react';

import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { Text, TextProps } from '../Text';
import { sizeMapper } from './helpers';
import { HelperTextSize } from './types';

export interface HelperTextProps extends Omit<TextProps, 'size'> {
  /**
   * Visual size of the helper text.
   * Adjusts font size and spacing relative to form element size.
   */
  size?: HelperTextSize
  /**
   * Displays the helper text in an error state.
   * Changes color to red.
   */
  error?: boolean
}

/** Helper Text is a UI component that provides additional guidance or information to assist users in completing a task, typically displayed below an input field or form element to clarify its purpose or offer instructions */
export const HelperText: FC<HelperTextProps> = ({ className, size = 'md', error, children, ...props }) => {
  return (
    <Text
      asChild
      className={csx(style.helperText, className)}
      data-error={error}
      size={sizeMapper(size)}
      {...props}
    >
      <p>{children}</p>
    </Text>
  );
}