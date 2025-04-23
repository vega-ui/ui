'use client';
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  Ref,
  useEffect,
  useRef
} from 'react';
import style from './style.module.css'
import { csx, mergeRefs } from '@adara-cs/utils';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import { sizeMapper } from './utils';

export interface CheckboxProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'> {
  /**
   * Optional custom CSS class for the checkbox input element.
   * Useful for styling overrides and scoped component design.
   */
  className?: string

  /**
   * Optional class name for the outer wrapper of the checkbox.
   * Commonly used to style the label or layout container.
   */
  wrapperClassName?: string

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
  variant?: 'primary' | 'secondary'

  /**
   * Size of the checkbox input and its visual marker.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Callback function fired when the checkbox state changes.
   * Receives the native `ChangeEvent<HTMLInputElement>`.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>

  /**
   * Disables the checkbox, making it non-interactive.
   * Also applies a visually disabled style.
   */
  disabled?: boolean

  /**
   * Ref to the native `<input type="checkbox">` element.
   * Useful for managing focus, setting indeterminate manually, etc.
   */
  ref?: Ref<HTMLInputElement>
}

/** A Checkbox is a UI component that allows users to select one or multiple options from a set, toggling between checked and unchecked states. */
export const Checkbox: FC<CheckboxProps> = ({
  variant = 'primary',
  size = 'medium',
  indeterminate,
  defaultChecked,
  checked,
  onChange,
  className,
  wrapperClassName,
  disabled,
  ref,
 ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current && indeterminate !== undefined) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <label className={csx(style.checkboxWrapper, wrapperClassName)}>
      <VisuallyHidden asChild ref={mergeRefs([inputRef, ref])}>
        <input onChange={onChange} type='checkbox' disabled={disabled} defaultChecked={defaultChecked} checked={checked} {...props} />
      </VisuallyHidden>
      <div className={csx(style.checkbox, className)} data-size={size} data-variant={variant}>
        <Icon aria-hidden className={style.checkboxCheckIcon} name='check' size={sizeMapper(size)} />
        <Icon aria-hidden className={style.checkboxIndeterminateIcon} name='minus' size={sizeMapper(size)} />
      </div>
    </label>
  )
}