import style from './style.module.css';
import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { ElementType, Fragment, Ref, MouseEvent } from 'react';
import { Icon, IconProps } from '../Icon';
import { sizeMapper } from './utils';
import { csx } from '@adara-cs/utils';

export type IconButtonProps<T extends ElementType> = ButtonBaseProps<T> & {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large'
  iconSize?: IconProps['size']
  name?: IconProps['name']
  onClick?: (e: MouseEvent) => void;
  className?: string
}

/** Primary UI component for user interaction */
export const IconButton = <T extends ElementType = 'button'>({
  size = 'medium',
  iconSize,
  disabled,
  variant = 'primary',
  appearance = 'fill',
  type = 'button',
  className,
  name,
  children,
  ref,
  ...props
}: IconButtonProps<T>) => {
  return (
    <ButtonBase
      type={type}
      {...(props as Record<string, unknown>)}
      ref={ref as Ref<never>}
      disabled={disabled}
      className={csx(style.iconButton, className)}
      data-size={size}
      variant={variant}
      appearance={appearance}
    >
      {children ? children : name ? <Icon name={name} size={iconSize ?? sizeMapper(size)} /> : <Fragment />}
    </ButtonBase>
  );
}
