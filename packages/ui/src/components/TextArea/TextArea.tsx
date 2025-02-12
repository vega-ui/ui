import {
  FC,
  Ref, TextareaHTMLAttributes,
} from 'react';
import style from './style.module.css'
import { csx } from '@adara-cs/utils';

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  disabled?: boolean
  className?: string
  placeholder?: string
  value?: string | number
  size?: 'small' | 'medium' | 'large'
  error?: boolean
  fullWidth?: boolean
  ref?: Ref<HTMLTextAreaElement>
}

export const TextArea: FC<TextAreaProps> = ({
  className,
  placeholder,
  error,
  size = 'medium',
  fullWidth,
  ref,
  ...props
}) => {
  return (
    <textarea data-size={size} data-full-width={fullWidth} data-error={error} ref={ref} placeholder={placeholder} className={csx(style.textarea, className)} {...props} />
  )
}