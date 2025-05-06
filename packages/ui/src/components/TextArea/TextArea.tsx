import {
  FC,
  Ref, TextareaHTMLAttributes,
} from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /**
   * Disables the textarea, preventing user input.
   * Also applies a visually disabled style.
   */
  disabled?: boolean

  /**
   * Optional class name applied to the textarea element.
   * Useful for styling overrides or scoped design rules.
   */
  className?: string

  /**
   * Placeholder text shown when the textarea is empty.
   */
  placeholder?: string

  /**
   * The current value of the textarea.
   * Can be a string or number.
   */
  value?: string | number

  /**
   * Visual size of the textarea.
   * Controls padding, font size, and height presets.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Displays the textarea in an error state.
   */
  error?: boolean

  /**
   * Makes the textarea expand to fill the full width of its container.
   */
  fullWidth?: boolean

  /**
   * Ref forwarded to the native `<textarea>` element.
   * Useful for focus control, measurement, or integrations.
   */
  ref?: Ref<HTMLTextAreaElement>
}

/** A TextArea is a UI component that allows users to input multi-line text, commonly used for longer responses, comments, or descriptions. It provides more space than a standard TextField */
export const TextArea: FC<TextAreaProps> = ({
  className,
  placeholder,
  error,
  size = 'medium',
  fullWidth,
  ref,
  ...props
}) => {
  return (
    <textarea data-size={size} data-full-width={fullWidth} data-error={error} ref={ref} placeholder={placeholder} className={csx(style.textarea, className)} {...props} />
  )
}