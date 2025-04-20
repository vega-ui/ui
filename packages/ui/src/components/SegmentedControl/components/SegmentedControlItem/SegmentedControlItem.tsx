import { ChangeEvent, FC, HTMLAttributes, ReactNode } from 'react';
import style from './style.module.css';
import { VisuallyHidden } from '../../../VisuallyHidden';
import { useSegmentedControlContext } from '../../hooks';

export interface SegmentedControlItemProps extends HTMLAttributes<HTMLInputElement> {
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary'
  children?: ReactNode
  checked?: boolean
  value?: string | number
}

export const SegmentedControlItem: FC<SegmentedControlItemProps> = ({ disabled, checked, variant, size = 'medium', value, children, onChange, ...props }) => {
  const { value: selectedValue, size: _size, onChange: _onChange, name, disabled: _disabled, variant: _variant } = useSegmentedControlContext()

  const inputChecked = checked ?? selectedValue === value

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    _onChange(e)
    onChange?.(e)
  }

  return (
    <label data-checked={inputChecked} data-disabled={disabled} data-size={_size ?? size} data-variant={variant ?? _variant} className={style.control}>
      <VisuallyHidden as='input' onChange={onInputChange} value={value} disabled={_disabled ?? disabled} type='radio' name={name}
                      defaultChecked={inputChecked} {...props} />
      {children}
    </label>
  )
}