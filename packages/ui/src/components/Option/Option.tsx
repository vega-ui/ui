import { FC, HTMLAttributes, KeyboardEvent, ReactNode, Ref, MouseEvent } from 'react';
import styles from './style.module.css'
import { csx } from '@adara-cs/utils';

export interface OptionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  selected?: boolean
  value: string | number
  children?: ReactNode
  focusable?: boolean
  size?: 'small' | 'medium' | 'large'
  onSelect?(event: MouseEvent | KeyboardEvent, value: string | number): void
  ref?: Ref<HTMLDivElement>
}

export const Option: FC<OptionProps> = ({
  selected,
  focusable,
  size = 'medium',
  value,
  children,
  className,
  onSelect: handleSelect,
  ref,
  ...props
}) => {
  const onSelect = (e: MouseEvent) => {
    handleSelect?.(e, value)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || ['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      handleSelect?.(e, value)
    }
  }

  return (
    <div ref={ref} {...props} onClick={onSelect} onKeyDown={onKeyDown} tabIndex={focusable ? 0 : -1} data-size={size} role='option' aria-selected={selected} className={csx(styles.option, className)}>
      {children}
    </div>
  )
}