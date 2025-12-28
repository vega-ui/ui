import { HTMLAttributes, ReactNode, Ref } from 'react';
import styles from './style.module.css'
import { csx } from '@vega-ui/utils';
import { OptionSize } from './types';

export interface OptionProps<V> extends Omit<HTMLAttributes<HTMLButtonElement>, 'size'> {
  /**
   * Whether this option is currently selected.
   */
  selected?: boolean

  /**
   * The unique value associated with this option.
   * Used in change callbacks and for identity comparisons.
   */
  value: V

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
  size?: OptionSize

  /**
   * Ref forwarded to the root div of the option.
   * Useful for scroll management or focus handling in virtualized lists.
   */
  ref?: Ref<HTMLButtonElement>
  
  disabled?: boolean
}

/** An Option is a single item within a Dropdown, Select, or similar list-based UI component, representing a choice that can be selected by the user */
export const Option = <V extends string | number>({
  selected,
  focusable,
  size = 'md',
  children,
  className,
  onClick,
  disabled,
  ref,
  ...props
}: OptionProps<V>) => {
  return (
    <button
      role='option'
      ref={ref}
      onClick={onClick}
      tabIndex={focusable ? 0 : -1}
      data-size={size}
      aria-selected={selected}
      className={csx(styles.option, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}