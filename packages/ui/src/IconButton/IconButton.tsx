import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';
import { IconButtonSize } from './types';

export interface IconButtonProps extends ButtonBaseProps {
  /**
   * Disables the button, preventing user interaction.
   * Also applies a visually disabled state.
   */
  disabled?: boolean

  /**
   * Specifies the native HTML button type.
   *
   * - 'button': Default button behavior
   * - 'submit': Submits a form
   * - 'reset': Resets a form
   */
  type?: 'button' | 'submit' | 'reset'

  /**
   * Size of the button container.
   * Controls padding and overall clickable area.
   */
  size?: IconButtonSize

  /**
   * When true, renders the button as a child component using `Slot` (e.g., from Radix UI).
   * Enables polymorphic rendering — useful for making the button act as a link or custom tag.
   */
  asChild?: boolean

  /**
   * Custom class name for styling the IconButton container.
   */
  className?: string
}

/** Primary UI component for user interaction */
export const IconButton: FC<IconButtonProps> = ({
  size = 'md',
  disabled,
  type = 'button',
  className,
  children,
  asChild,
  ref,
  ...props
}) => {
  return (
    <ButtonBase
      type={type}
      {...props}
      asChild={asChild}
      ref={ref}
      disabled={disabled}
      className={csx(style.iconButton, className)}
      data-size={size}
    >
      {children}
    </ButtonBase>
  );
}
