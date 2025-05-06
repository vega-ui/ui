import { FC } from 'react';

import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { Text } from '../Text';
import { sizeMapper } from './utils';

export interface HelperTextProps {
  /**
   * Custom class name for styling the helper text container.
   * Useful for design tokens or overrides.
   */
  className?: string

  /**
   * The content of the helper text.
   * Can be a single string or an array of strings for multi-line messages.
   */
  children?: string | string[]

  /**
   * Visual size of the helper text.
   * Adjusts font size and spacing relative to form element size.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Font weight of the helper text.
   *
   * - 400: Regular
   * - 500: Medium
   * - 700: Bold
   * - 900: Extra bold
   */
  fontWeight?: 400 | 500 | 700 | 900

  /**
   * Displays the helper text in an error state.
   * Changes color to red.
   */
  error?: boolean
}

/** Helper Text is a UI component that provides additional guidance or information to assist users in completing a task, typically displayed below an input field or form element to clarify its purpose or offer instructions */
export const HelperText: FC<HelperTextProps> = ({ className, size = 'medium', error, fontWeight, children }) => {
  return (
    <Text asChild className={csx(style.helperText, className)} data-error={error} size={sizeMapper(size)} fontWeight={fontWeight}>
      <p>{children}</p>
    </Text>
  );
}