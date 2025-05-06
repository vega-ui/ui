import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { FC, ReactNode, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { Spinner } from '../Spinner';
import style from './style.module.css';
import { sizeMapper } from './utils';

export interface ButtonProps extends ButtonBaseProps {
  /**
   * Disables the button, preventing user interaction.
   * When true, the button is non-interactive and styled accordingly.
   */
  disabled?: boolean

  /**
   * Displays a loading spinner and disables the button.
   * Useful for indicating ongoing processes.
   */
  loading?: boolean

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
  size?: 'small' | 'medium' | 'large'

  /**
   * Custom content to display as a spinner during loading.
   * Overrides the default spinner component.
   */
  spinnerSlot?: ReactNode

  /**
   * Custom CSS class for the spinner element.
   * Allows for styling overrides.
   */
  spinnerClassName?: string

  /**
   * When true, the button expands to fill the width with its container.
   */
  fullWidth?: boolean
}

/** Primary UI component for user interaction */
export const Button: FC<ButtonProps> = ({
   size = 'medium',
   disabled,
   children,
   variant = 'primary',
   appearance = 'fill',
   type = 'button',
   loading = false,
   spinnerSlot,
   spinnerClassName,
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
      disabled={disabled || loading}
      appearance={appearance}
      variant={variant}
      ref={ref as Ref<never>}
    >
      {!asChild ? (
        <>
          {loading && (spinnerSlot ? spinnerSlot : <Spinner className={csx(style.spinner, spinnerClassName)} aria-hidden variant='secondary' size={sizeMapper(size)} />)}
          {children}
        </>
      ) : children}
    </ButtonBase>
  );
}
