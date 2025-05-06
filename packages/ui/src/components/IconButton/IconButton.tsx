import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { Ref, FC, cloneElement, ReactElement, PropsWithChildren } from 'react';
import { Icon, IconProps } from '../Icon';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';

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
  size?: 'small' | 'medium' | 'large'

  /**
   * Size of the icon rendered inside the button.
   * Inherits from the `IconProps['size']` type.
   */
  iconSize?: IconProps['size']

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
  size = 'medium',
  iconSize = null,
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
      {...(props as Record<string, unknown>)}
      asChild={asChild}
      ref={ref as Ref<never>}
      disabled={disabled}
      className={csx(style.iconButton, className)}
      data-size={size}
    >
      {asChild
        ? cloneElement(
          children as ReactElement,
          ((children as ReactElement).props as PropsWithChildren),
          <Icon className={style.icon} size={iconSize}>{((children as ReactElement).props as PropsWithChildren)?.children}</Icon>
        )
        : <Icon className={style.icon} size={iconSize}>{children}</Icon>
      }
    </ButtonBase>
  );
}
