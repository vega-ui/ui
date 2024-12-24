import {
  forwardRef, HTMLAttributes,
} from 'react';
import style from './style.module.css'
import { csx } from '../../utils/css';

export interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
  disabled?: boolean
  className?: string
  placeholder?: string
  value?: string | number
  size?: 'small' | 'medium' | 'large'
  error?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  className,
  placeholder,
  error,
  size = 'medium',
  ...props
}, ref) => {
  return (
    <textarea data-size={size} data-error={error} ref={ref} placeholder={placeholder} className={csx(style.textarea, className)} {...props} />
  )
})