import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import { ButtonShape, ButtonSize } from './types';
import style from './style.module.css';

export interface ButtonProps extends ButtonBaseProps {
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
}

/** Primary UI component for user interaction */
export const Button: FC<ButtonProps & ButtonShape> = ({
   size = 'md',
   disabled,
   children,
   variant = 'primary',
   appearance = 'fill',
   className,
   square,
   asChild,
   ref,
   ...props
}) => {
  return (
    <ButtonBase
      asChild={asChild}
      data-square={square || undefined}
      className={csx(style.button, className)}
      data-size={size}
      disabled={disabled}
      appearance={appearance}
      variant={variant}
      ref={ref}
      {...props}
    >
      {children}
    </ButtonBase>
  );
}
