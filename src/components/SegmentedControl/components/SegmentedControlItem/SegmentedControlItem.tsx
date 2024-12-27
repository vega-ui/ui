import { ChangeEvent, FC, ReactNode } from 'react';
import { VisuallyHidden } from '../../../VisuallyHidden';
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
      <VisuallyHidden onChange={(e) => onChange?.(e, e.target.value)} value={value} disabled={disabled} as='input' type='radio' name={name}
                      defaultChecked={checked} />
      {children}
    </label>
  )
}