import { forwardRef, PropsWithChildren, ReactNode } from 'react';
import { csx } from '@adara-cs/utils';
import { SelectValue } from '../SelectValue';
import style from './style.module.css';
import { SelectPlaceholder } from '../SelectPlaceholder';
import { SelectArrow } from '../SelectArrow';

export interface SelectComboboxProps {
  comboboxClassName?: string
  className?: string
  valueClassName?: string
  placeholderClassName?: string
  startSlot?: ReactNode
  endSlot?: ReactNode
  valueSlot?: ReactNode
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  variant?: 'inline' | 'field'
  size?: 'small' | 'medium' | 'large'
  withArrow?: boolean
  open?: boolean
}

export const SelectCombobox = forwardRef<HTMLButtonElement, PropsWithChildren<SelectComboboxProps>>(({
  size = 'medium',
  open,
  className,
  valueClassName,
  placeholderClassName,
  variant = 'field',
  disabled,
  readOnly,
  startSlot,
  valueSlot,
  endSlot,
  withArrow = true,
  placeholder,
  children,
  ...props
}, ref) => {
  return (
    <button role='combobox' type='button' data-size={size} data-variant={variant} data-state={open ? 'open' : 'close'}
            aria-disabled={disabled} aria-readonly={readOnly} tabIndex={0} ref={ref}
            className={csx(style.selectCombobox, className)} {...props}>
      <div className={style.segment}>
        {startSlot}
        {children
          ? valueSlot ? valueSlot : <SelectValue className={csx(style.value, valueClassName)}>{children}</SelectValue>
          : <SelectPlaceholder className={csx(style.placeholder, placeholderClassName)}>{placeholder}</SelectPlaceholder>
        }
      </div>
      {(withArrow || endSlot) && (
        <div className={style.control}>
          {endSlot}
          {withArrow && <SelectArrow open={open} className={style.controlIcon}/>}
        </div>
      )}
    </button>
  )
})