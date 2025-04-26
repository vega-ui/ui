import { DetailedHTMLProps, FC, InputHTMLAttributes, Ref } from 'react'
import style from './style.module.css'
import { csx } from '@adara-cs/utils'

export interface RadioProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'size'
  > {
  /**
   * Optional custom CSS class for the checkbox input element.
   * Useful for styling overrides and scoped component design.
   */
  className?: string

  /**
   * Controlled checked state of the checkbox.
   * Used in controlled components for full state management.
   */
  checked?: boolean

  /**
   * Initial checked state for uncontrolled usage.
   * Mirrors the native `defaultChecked` HTML behavior.
   */
  defaultChecked?: boolean

  /**
   * Visual variant of the checkbox, for theme or context switching.
   */
  variant?: 'primary' | 'secondary'

  /**
   * Size of the checkbox input and its visual marker.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Disables the checkbox, making it non-interactive.
   * Also applies a visually disabled style.
   */
  disabled?: boolean

  /**
   * Ref to the native `<input type="radio">` element.
   * Useful for managing focus, setting indeterminate manually, etc.
   */
  ref?: Ref<HTMLInputElement>
}

/** A Radio is a UI component that allows users to select a single option from a group, ensuring only one item can be selected at a time within the set. */
export const Radio: FC<RadioProps> = ({
  variant = 'primary',
  size = 'medium',
  defaultChecked,
  checked,
  className,
  disabled,
  ref,
  ...props
}) => {
  return (
    <input
      {...props}
      ref={ref}
      type='radio'
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      className={csx(style.radio, className)}
      data-variant={variant}
      data-size={size}
    />
  )
}
