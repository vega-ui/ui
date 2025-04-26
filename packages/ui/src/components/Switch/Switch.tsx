import { DetailedHTMLProps, FC, InputHTMLAttributes, Ref } from 'react'
import style from './style.module.css'
import { csx } from '@adara-cs/utils'
import { VisuallyHidden } from '../VisuallyHidden'

export interface SwitchProps
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
   * Ref to the native `<input role="switch" type="checkbox">` element.
   * Useful for managing focus, setting indeterminate manually, etc.
   */
  ref?: Ref<HTMLInputElement>
}

/** A Switch is a UI component that allows users to toggle between two opposing states, such as on and off, typically representing a binary setting or preference. */
export const Switch: FC<SwitchProps> = ({
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
    <label
      data-size={size}
      data-variant={variant}
      className={csx(style.switch, className)}>
      <div className={style.switchControl} />
      <VisuallyHidden asChild>
        <input
          {...props}
          ref={ref}
          role='switch'
          type='checkbox'
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          data-size={size}
        />
      </VisuallyHidden>
    </label>
  )
}
