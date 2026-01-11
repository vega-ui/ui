import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';
import { IconButtonSize } from './types';

export interface IconButtonProps extends ButtonBaseProps {
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
      asChild={asChild}
      ref={ref}
      disabled={disabled}
      data-size={size}
      className={csx(style.iconButton, className)}
      {...props}
    >
      {children}
    </ButtonBase>
  );
}
