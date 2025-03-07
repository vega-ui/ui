'use client';
import { FC, Ref } from 'react';
import { Card, CardProps } from '../Card';
import { Checkbox, CheckboxProps } from '../Checkbox';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'
import { CheckboxCardProvider } from './providers/CheckboxCardProvider';
import { sizeMapper } from './utils';

export interface CheckboxCardProps extends Omit<CardProps, 'appearance'>, Pick<CheckboxProps, 'checked' | 'value' | 'indeterminate'> {
  className?: string
  wrapperClassName?: string
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  variant?: 'primary' | 'secondary'
  ref?: Ref<HTMLInputElement>
}

export const CheckboxCard: FC<CheckboxCardProps> = ({
  children,
  size = 'medium',
  orientation = 'vertical',
  className,
  wrapperClassName,
  onChange,
  checked,
  indeterminate,
  value,
  disabled,
  variant = 'primary',
  ref,
  ...props
}) => {
  return (
    <CheckboxCardProvider size={size}>
      <label className={csx(style.checkboxCardWrapper, wrapperClassName)}>
        <Card ref={ref} data-orientation={orientation} data-variant={variant} className={csx(className, style.checkboxCard)}
              size={size} {...props}>
          <div className={style.content}>
            {children}
          </div>
          <Checkbox variant={variant} onChange={onChange} checked={checked} indeterminate={indeterminate} value={value}
                    disabled={disabled} size={sizeMapper(size)} />
        </Card>
      </label>
    </CheckboxCardProvider>
  )
}