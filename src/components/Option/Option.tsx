import { forwardRef, HTMLAttributes, KeyboardEvent } from 'react';
import styles from './style.module.css'
import { Text } from '../Text';
import { csx } from '../../utils/css';

export interface OptionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  selected?: boolean
  value: string | number
  children?: string
  focusable?: boolean
  size?: 'small' | 'medium' | 'large'
  onSelect?(value: string | number): void
}

export const Option = forwardRef<HTMLDivElement, OptionProps>(({ selected, focusable, size, value, children, className, onSelect: handleSelect, ...props }, ref) => {
  const onSelect = () => {
    handleSelect?.(value)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || ['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      handleSelect?.(value)
    }
  }

  return (
    <div ref={ref} {...props} onClick={onSelect} onKeyDown={onKeyDown} tabIndex={focusable ? 0 : -1} data-size={size} role='option' aria-selected={selected} className={csx(styles.option, className)}>
      <Text className={styles.text}>{children}</Text>
    </div>
  )
})