import { ChangeEvent, FC, ReactNode } from 'react';
import style from './style.module.css';

export interface SegmentedControlItemProps {
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary'
  children?: ReactNode
  checked?: boolean
  value?: string | number
  name?: string
  onChange?(e: ChangeEvent<HTMLInputElement>, value: string | number): void
}

export const SegmentedControlItem: FC<SegmentedControlItemProps> = ({ disabled, checked, variant, name, onChange, size = 'medium', value, children }) => {
  return (
    <label data-checked={checked} data-disabled={disabled} data-size={size} data-variant={variant} className={style.control}>
      <input onChange={(e) => onChange?.(e, e.target.value)} hidden value={value} disabled={disabled} type='radio' name={name}
                      defaultChecked={checked} />
      {children}
    </label>
  )
}