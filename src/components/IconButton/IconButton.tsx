import style from './style.module.css';
import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { Fragment, ReactNode } from 'react';
import { Icon, IconProps } from '../Icon';

export interface IconButtonProps extends Omit<ButtonBaseProps, 'children'> {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large';
  name?: IconProps['name']
  children?: ReactNode;
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const IconButton = ({
  size = 'medium',
  disabled,
  variant = 'primary',
  appearance = 'fill',
  type = 'button',
  name,
  children,
  ...props
}: IconButtonProps) => {
  return (
    <ButtonBase
      type={type}
      disabled={disabled}
      className={style.iconButton}
      data-size={size}
      variant={variant}
      appearance={appearance}
      {...props}
    >
      {children ? children : name ? <Icon color='currentColor' name={name} /> : <Fragment />}
    </ButtonBase>
  );
};
