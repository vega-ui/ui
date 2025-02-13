import {
  FC,
  InputHTMLAttributes, ReactNode, Ref,
} from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';

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
  ref?: Ref<HTMLInputElement>
}

export const TextField: FC<TextFieldProps> = ({
  className,
  wrapperClassName,
  startSlotClassName,
  endSlotClassName,
  startSlot,
  endSlot,
  placeholder,
  error,
  size = 'medium',
  hidden,
  ref,
  ...props
}) => {
  return (
    <div data-size={size} className={csx(style.inputWrapper, wrapperClassName)} hidden={hidden}>
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
}