import { FC, HTMLAttributes, KeyboardEvent, ReactNode, Ref, MouseEvent } from 'react';
import styles from './style.module.css'
import { csx } from '@adara-cs/utils';

export interface OptionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * Whether this option is currently selected.
   */
  selected?: boolean

  /**
   * The unique value associated with this option.
   * Used in change callbacks and for identity comparisons.
   */
  value: string | number

  /**
   * The content displayed for this option.
   * Can include text, icons, or complex markup.
   */
  children?: ReactNode

  /**
   * If true, the option can receive keyboard focus.
   */
  focusable?: boolean

  /**
   * Size of the option for visual styling.
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * Callback fired when the option is selected via click or keyboard.
   *
   * @param event - The triggering event (mouse or keyboard)
   * @param value - The associated option value
   */
  onSelect?(event: MouseEvent | KeyboardEvent, value: string | number): void

  /**
   * Ref forwarded to the root div of the option.
   * Useful for scroll management or focus handling in virtualized lists.
   */
  ref?: Ref<HTMLDivElement>
}

/** An Option is a single item within a Dropdown, Select, or similar list-based UI component, representing a choice that can be selected by the user */
export const Option: FC<OptionProps> = ({
  selected,
  focusable,
  size = 'medium',
  value,
  children,
  className,
  onSelect: _onSelect,
  ref,
  ...props
}) => {
  const onSelect = (e: MouseEvent) => {
    _onSelect?.(e, value)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || ['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      _onSelect?.(e, value)
    }
  }

  return (
    <div ref={ref} {...props} onClick={onSelect} onKeyDown={onKeyDown} tabIndex={focusable ? 0 : -1} data-size={size} role='option' aria-selected={selected} className={csx(styles.option, className)}>
      {children}
    </div>
  )
}