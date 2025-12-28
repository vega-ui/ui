import { FC, HTMLAttributes, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { CheckboxSize, CheckboxVariant } from './types';
import { CheckboxProvider } from './contexts';

export interface CheckboxProps extends HTMLAttributes<HTMLLabelElement> {
  /**
   * Optional custom CSS class for the checkbox input element.
   * Useful for styling overrides and scoped component design.
   */
  className?: string

  /**
   * Sets the checkbox to an indeterminate visual state.
   * Often used when only some nested items are selected.
   * This state is visual only and must be controlled manually.
   */
  indeterminate?: boolean

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
  variant?: CheckboxVariant

  /**
   * Size of the checkbox input and its visual marker.
   */
  size?: CheckboxSize

  /**
   * Callback function fired when the checkbox state changes.
   */
  onChangeChecked?(value: boolean): void

  /**
   * Disables the checkbox, making it non-interactive.
   * Also applies a visually disabled style.
   */
  disabled?: boolean

  /**
   * Ref to the native label element.
   * Useful for managing focus, setting indeterminate manually, etc.
   */
  ref?: Ref<HTMLLabelElement>
}

/** A Checkbox is a UI component that allows users to select one or multiple options from a set, toggling between checked and unchecked states. */
export const Checkbox: FC<CheckboxProps> = ({
  ref,
  variant = 'primary',
  size = 'md',
  indeterminate,
  checked,
  defaultChecked,
  className,
  disabled,
  onChangeChecked,
  children,
 ...props
}) => {
  return (
    <CheckboxProvider
      size={size}
      indeterminate={indeterminate}
      defaultChecked={defaultChecked}
      checked={checked}
      onChangeChecked={onChangeChecked}
      disabled={disabled}
      variant={variant}
    >
      <label
        className={csx(style.checkbox, className)}
        data-size={size}
        data-variant={variant}
        ref={ref}
        {...props}
      >
        {children}
      </label>
    </CheckboxProvider>
  )
}