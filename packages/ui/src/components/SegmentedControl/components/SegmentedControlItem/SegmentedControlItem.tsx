import { ChangeEvent, FC, HTMLAttributes, ReactNode } from 'react';
import style from './style.module.css';
import { VisuallyHidden } from '../../../VisuallyHidden';
import { useSegmentedControlContext } from '../../hooks';
import { csx } from '@adara-cs/utils';

export interface SegmentedControlItemProps extends HTMLAttributes<HTMLInputElement> {
  /**
   * Disables the item, preventing selection and focus.
   */
  disabled?: boolean

  /**
   * Controls the size of the item.
   * Affects padding, font size, and spacing.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Visual style variant of the item.
   */
  variant?: 'primary' | 'secondary'

  /**
   * The content (usually a label or icon) displayed inside the item.
   */
  children?: ReactNode

  /**
   * Whether the item is currently selected.
   * Can be controlled manually or via SegmentedControl's `value`.
   */
  checked?: boolean

  /**
   * Value associated with this item, used for identification and selection.
   */
  value?: string | number
}

/** Represents an individual selectable option inside a SegmentedControl group */
export const SegmentedControlItem: FC<SegmentedControlItemProps> = ({
  disabled,
  checked,
  variant,
  size,
  value,
  children,
  className,
  onChange,
  ...props
}) => {
  const { value: selectedValue, size: _size, onChange: _onChange, name, disabled: _disabled, variant: _variant } = useSegmentedControlContext()

  const inputChecked = checked ?? selectedValue === value

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    _onChange(e)
    onChange?.(e)
  }

  return (
    <label data-checked={inputChecked} data-disabled={disabled} data-size={size ?? _size} data-variant={variant ?? _variant} className={csx(style.control, className)}>
      <VisuallyHidden asChild>
        <input onChange={onInputChange} value={value} disabled={_disabled ?? disabled} type='radio' name={name}
               checked={inputChecked} {...props} />
      </VisuallyHidden>
      {children}
    </label>
  )
}