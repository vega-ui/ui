import { FC, ReactNode } from 'react';
import style from './style.module.css';
import { VisuallyHidden } from '../../../VisuallyHidden';
import { useSegmentedControlContext } from '../../hooks';

export interface SegmentedControlItemProps {
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary'
  children?: ReactNode
  checked?: boolean
  value?: string | number
}

export const SegmentedControlItem: FC<SegmentedControlItemProps> = ({ disabled, checked, variant, size = 'medium', value, children }) => {
  const { value: selectedValue, size: _size, onChange, name, disabled: _disabled } = useSegmentedControlContext()

  const inputChecked = checked ?? selectedValue === value

  return (
    <label data-checked={inputChecked} data-disabled={disabled} data-size={_size ?? size} data-variant={variant} className={style.control}>
      <VisuallyHidden as='input' onChange={(e) => onChange(e, e.target.value)} value={value} disabled={_disabled ?? disabled} type='radio' name={name}
                      defaultChecked={inputChecked} />
      {children}
    </label>
  )
}