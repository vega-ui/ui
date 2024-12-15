import { forwardRef, HTMLAttributes, KeyboardEvent } from 'react';
import styles from './style.module.css'
import { Text } from '../Text';
import { csx } from '../../utils/css';

export interface OptionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  selected?: boolean
  value: string | number
  children?: string
  focusable?: boolean
  onSelect?(value: string | number): void
}

export const Option = forwardRef<HTMLDivElement, OptionProps>(({ selected, focusable, value, children, className, onSelect: handleSelect, ...props }, ref) => {
  const onSelect = () => {
    handleSelect?.(value)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || ['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      handleSelect?.(value);
    }
  }

  return (
    <div ref={ref} {...props} onClick={onSelect} onKeyDown={onKeyDown} tabIndex={focusable ? 0 : -1} role='option' aria-selected={selected} className={csx(styles.option, className)}>
      <Text className={styles.text}>{children}</Text>
    </div>
  )
})