import { FC, HTMLAttributes, Ref } from 'react';
import { csx, mergeProps, mergeRefs } from '@vega-ui/utils';
import style from './style.module.css';
import { SelectVariant } from '../../types';
import { useSelectContext } from '../../contexts';

export interface SelectComboboxProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Puts the combobox into read-only mode.
   *
   * When `true`, the value can be focused and read,
   * but user interaction that changes the value is disabled
   * (the dropdown should not open or change selection).
   */
  readOnly?: boolean
  
  /**
   * Visual variant of the combobox.
   *
   * Controls appearance (e.g. default, ghost, outlined, etc.)
   * without affecting behavior.
   */
  variant?: SelectVariant
  
  /**
   * Ref to the underlying `<button>` element.
   *
   * Useful for focus management, positioning, and imperative access.
   */
  ref?: Ref<HTMLButtonElement>
}

/**
 * Select combobox trigger component.
 *
 * Renders a button with `role="combobox"` that acts as the main control
 * for opening and closing the Select dropdown
 *
 * Children are typically composed of:
 * - `SelectValue` (current value / placeholder)
 * - `SelectIcon` (dropdown indicator)
 */
export const SelectCombobox: FC<SelectComboboxProps> = ({
  className,
  children,
  ref,
  ...props
}) => {
  const { context, disabled, readOnly, size, variant, open, comboboxProps } = useSelectContext()
  
  return (
    <button
      role='combobox'
      type='button'
      disabled={disabled}
      data-size={size}
      data-variant={variant}
      data-open={open}
      aria-readonly={readOnly}
      ref={mergeRefs([ref, context.refs?.setReference])}
      className={csx(style.combobox, className)}
      {...mergeProps(comboboxProps, props)}
    >
      {children}
    </button>
  )
}