import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import { ButtonSize } from './types.ts';
import style from './style.module.css';

export interface ButtonProps extends ButtonBaseProps {
  /**
   * Disables the button, preventing user interaction.
   * When true, the button is non-interactive and styled accordingly.
   */
  disabled?: boolean

  /**
   * Specifies the button's behavior.
   * - 'button': Standard button (default)
   * - 'submit': Submits a form
   * - 'reset': Resets a form
   */
  type?: 'button' | 'submit' | 'reset'

  /**
   * When true, renders the button as a child component using `Slot` (e.g., from Radix UI).
   * Enables polymorphic rendering — useful for making the button act as a link or custom tag.
   */
  asChild?: boolean

  /**
   * Defines the size of the button.
   * Affects padding, font size, and overall dimensions.
   */
  size?: ButtonSize

  /**
   * When true, the button expands to fill the width with its container.
   */
  fullWidth?: boolean
}

/** Primary UI component for user interaction */
export const Button: FC<ButtonProps> = ({
   size = 'md',
   disabled,
   children,
   variant = 'primary',
   appearance = 'fill',
   type = 'button',
   className,
   fullWidth,
   asChild,
   ref,
   ...props
}) => {
  return (
    <ButtonBase
      type={type}
      {...(props as Record<string, unknown>)}
      asChild={asChild}
      data-full-width={fullWidth}
      className={csx(style.button, className)}
      data-size={size}
      disabled={disabled}
      appearance={appearance}
      variant={variant}
      ref={ref}
    >
      {children}
    </ButtonBase>
  );
}
