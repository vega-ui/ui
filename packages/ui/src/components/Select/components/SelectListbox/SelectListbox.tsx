import { forwardRef, HTMLAttributes, ReactElement } from 'react'
import { csx } from '@adara-cs/utils';
import style from './style.module.css';
import { OptionProps } from '../../../Option';

export interface SelectListboxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'itemRef'> {
  fullWidth?: boolean
  className?: string
  children?: ReactElement<OptionProps> | ReactElement<OptionProps>[]
}

export const SelectListbox = forwardRef<HTMLDivElement, SelectListboxProps>(({
  fullWidth,
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      role='listbox'
      data-full-width={fullWidth}
      className={csx(style.selectListbox, className)}
      {...props}
    >
      {children}
    </div>
  )
})