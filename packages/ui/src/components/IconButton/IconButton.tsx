import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { Fragment, Ref, FC, cloneElement, ReactElement } from 'react';
import { Icon, IconProps } from '../Icon';
import { sizeMapper } from './utils';
import { csx } from '@adara-cs/utils';
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
   * Name of the icon to render.
   * Corresponds to a key in the icon registry.
   */
  name?: IconProps['name']

  /**
   * Custom class name for styling the IconButton container.
   */
  className?: string
}

/** Primary UI component for user interaction */
export const IconButton: FC<IconButtonProps> = ({
  size = 'medium',
  iconSize,
  disabled,
  type = 'button',
  className,
  name,
  children,
  asChild,
  ref,
  ...props
}) => {
  const IconElement = name ? <Icon name={name} size={iconSize ?? sizeMapper(size)} /> : <Fragment />

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
      {asChild ? (
        cloneElement(children as ReactElement, {}, IconElement)
      ) : (
        children ? children : name ? <Icon name={name} size={iconSize ?? sizeMapper(size)} /> : <Fragment />
      )}
    </ButtonBase>
  );
}
