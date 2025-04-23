'use client';
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  Ref,
  useEffect,
  useRef
} from 'react';
import style from './style.module.css'
import { csx, mergeRefs } from '@adara-cs/utils';
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
  ref?: Ref<HTMLInputElement>
}

export const Checkbox: FC<CheckboxProps> = ({
  variant = 'primary',
  size = 'medium',
  indeterminate,
  defaultChecked,
  checked,
  onChange,
  className,
  wrapperClassName,
  disabled,
  ref,
 ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current && indeterminate !== undefined) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <label className={csx(style.checkboxWrapper, wrapperClassName)}>
      <VisuallyHidden asChild ref={mergeRefs([inputRef, ref])}>
        <input onChange={onChange} type='checkbox' disabled={disabled} defaultChecked={defaultChecked} checked={checked} {...props} />
      </VisuallyHidden>
      <div className={csx(style.checkbox, className)} data-size={size} data-variant={variant}>
        <Icon aria-hidden className={style.checkboxCheckIcon} name='check' size={sizeMapper(size)} />
        <Icon aria-hidden className={style.checkboxIndeterminateIcon} name='minus' size={sizeMapper(size)} />
      </div>
    </label>
  )
}