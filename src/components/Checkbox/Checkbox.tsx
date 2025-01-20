'use client';
import { ChangeEventHandler, DetailedHTMLProps, forwardRef, InputHTMLAttributes, useEffect, useRef } from 'react';
import { mergeRefs } from '../../utils/margeRefs';
import style from './style.module.css'
import { csx } from '../../utils/css';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import { sizeMapper } from './utils';

export interface CheckboxProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'> {
  className?: string
  wrapperClassName?: string
  indeterminate?: boolean
  checked?: boolean
  defaultChecked?: boolean
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  onChange?: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  variant = 'primary',
  size = 'medium',
  indeterminate,
  defaultChecked,
  checked,
  onChange,
  className,
  wrapperClassName,
  disabled,
  ...props
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current && indeterminate !== undefined) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <label className={csx(style.checkboxWrapper, wrapperClassName)}>
      <VisuallyHidden onChange={onChange} as='input' type='checkbox' ref={mergeRefs([inputRef, ref])} disabled={disabled} defaultChecked={defaultChecked} checked={checked} {...props} />
      <div className={csx(style.checkbox, className)} data-size={size} data-variant={variant}>
        <Icon aria-hidden className={style.checkboxCheckIcon} name='check' size={sizeMapper(size)} />
        <Icon aria-hidden className={style.checkboxIndeterminateIcon} name='minus' size={sizeMapper(size)} />
      </div>
    </label>
  )
})