'use client';
import { FC, Ref } from 'react';
import { Card, CardProps } from '../Card';
import { Checkbox, CheckboxProps } from '../Checkbox';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'

export interface CheckboxCardProps extends CardProps, Pick<CheckboxProps, 'checked' | 'value' | 'indeterminate'> {
  className?: string
  wrapperClassName?: string
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  ref?: Ref<HTMLInputElement>
}

export const CheckboxCard: FC<CheckboxCardProps> = ({
  children,
  size = 'small',
  orientation = 'vertical',
  className,
  wrapperClassName,
  onChange,
  checked,
  indeterminate,
  value,
  disabled,
  ref,
  ...props
}) => {
  return (
    <label className={csx(style.checkboxCardWrapper, wrapperClassName)}>
      <Card ref={ref} data-orientation={orientation} className={csx(className, style.checkboxCard)} size={size} {...props}>
        <div className={style.content}>
          {children}
        </div>
        <Checkbox onChange={onChange} checked={checked} indeterminate={indeterminate} value={value} disabled={disabled} size='large' />
      </Card>
    </label>
  )
}