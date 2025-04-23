import {
  FC,
  InputHTMLAttributes, ReactNode, Ref,
} from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Disables the input field, making it non-interactive.
   * Also applies a disabled visual style.
   */
  disabled?: boolean

  /**
   * Custom class name applied to the input element.
   */
  className?: string

  /**
   * Optional class name for the outer wrapper of the input.
   * Useful for layout and spacing control.
   */
  wrapperClassName?: string

  /**
   * Optional class name for the element wrapping the `startSlot`.
   */
  startSlotClassName?: string

  /**
   * Optional class name for the element wrapping the `endSlot`.
   */
  endSlotClassName?: string

  /**
   * Placeholder text displayed when the input is empty.
   */
  placeholder?: string

  /**
   * The current value of the input.
   * Can be a string or number.
   */
  value?: string | number

  /**
   * Visual size of the text field.
   * Affects padding, font size, and overall height.
   *
   * - 'small': Compact input
   * - 'medium': Default
   * - 'large': Spacious layout
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Content displayed at the start (left) of the input field.
   * Commonly used for icons or prefixes.
   */
  startSlot?: ReactNode

  /**
   * Content displayed at the end (right) of the input field.
   * Commonly used for icons, clear buttons, or status indicators.
   */
  endSlot?: ReactNode

  /**
   * Shows the input in an error state.
   */
  error?: boolean

  /**
   * Ref forwarded to the native input element.
   * Useful for programmatic control, focus, or integration.
   */
  ref?: Ref<HTMLInputElement>
}

/** A TextField is a UI component that allows users to input text, commonly used for forms, search bars, and other input tasks. It can support various types of data like single-line or multi-line input */
export const TextField: FC<TextFieldProps> = ({
  className,
  wrapperClassName,
  startSlotClassName,
  endSlotClassName,
  startSlot,
  endSlot,
  placeholder,
  error,
  size = 'medium',
  hidden,
  ref,
  ...props
}) => {
  return (
    <div data-size={size} className={csx(style.inputWrapper, wrapperClassName)} hidden={hidden}>
      {startSlot && (
        <div className={csx(style.startSlot, startSlotClassName)}>
          {startSlot}
        </div>
      )}
      <input data-error={error} ref={ref} placeholder={placeholder} className={csx(style.input, className)} {...props} />
      {endSlot && (
        <div className={csx(style.endSlot, endSlotClassName)}>
          {endSlot}
        </div>
      )}
    </div>
  )
}