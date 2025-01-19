import {
  forwardRef, TextareaHTMLAttributes,
} from 'react';
import style from './style.module.css'
import { csx } from '../../utils/css';

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  disabled?: boolean
  className?: string
  placeholder?: string
  value?: string | number
  size?: 'small' | 'medium' | 'large'
  error?: boolean
  fullWidth?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  className,
  placeholder,
  error,
  size = 'medium',
  fullWidth,
  ...props
}, ref) => {
  return (
    <textarea data-size={size} data-full-width={fullWidth} data-error={error} ref={ref} placeholder={placeholder} className={csx(style.textarea, className)} {...props} />
  )
})