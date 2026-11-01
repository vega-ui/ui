import { FC, HTMLAttributes, ReactNode, Ref } from 'react';
import styles from './style.module.css'
import { csx } from '@vega-ui/utils';
import { OptionSize } from './types';

export interface OptionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
  /**
   * Whether this option is currently selected.
   */
  selected?: boolean

  /**
   * The content displayed for this option.
   * Can include text, icons, or complex markup.
   */
  children?: ReactNode

  /**
   * Whether this option is the current target of keyboard navigation.
   * The focus stays on the owner of the list, which points here with `aria-activedescendant`.
   */
  active?: boolean

  /**
   * Size of the option for visual styling.
   */
  size?: OptionSize

  /**
   * Ref forwarded to the root div of the option.
   */
  ref?: Ref<HTMLDivElement>
  
  /**
   * Disables the entire Option.
   */
  disabled?: boolean
}

/** An Option is a single item within a Dropdown, Select, or similar list-based UI component, representing a choice that can be selected by the user */
export const Option: FC<OptionProps> = ({
  selected,
  active,
  size = 'md',
  children,
  className,
  disabled,
  onClick,
  ref,
  ...props
}) => {
  return (
    <div
      role='option'
      ref={ref}
      data-size={size}
      data-active={active}
      aria-selected={selected}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={csx(styles.option, className)}
      {...props}
    >
      {children}
    </div>
  )
}
