import {
  forwardRef, InputHTMLAttributes, ReactNode,
} from 'react';
import style from './style.module.css'
import { csx } from '../../utils/css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  disabled?: boolean
  className?: string
  wrapperClassName?: string
  startSlotClassName?: string
  endSlotClassName?: string
  placeholder?: string
  value?: string | number
  size?: 'small' | 'medium' | 'large'
  startSlot?: ReactNode
  endSlot?: ReactNode
  error?: boolean
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({
  className,
  wrapperClassName,
  startSlotClassName,
  endSlotClassName,
  startSlot,
  endSlot,
  placeholder,
  error,
  size = 'medium',
  ...props
}, ref) => {
  return (
    <div data-size={size} className={csx(style.inputWrapper, wrapperClassName)}>
      {startSlot && (
        <div className={csx(style.startSlot, startSlotClassName)}>
          {startSlot}
        </div>
      )}
      <input data-error={error} ref={ref} placeholder={placeholder} className={csx(style.input, className)} {...props} />
      {endSlot && (
        <div className={csx(style.endSlot, endSlotClassName)}>
          {endSlot}
        </div>
      )}
    </div>
  )
})