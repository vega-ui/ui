import style from './style.module.css';
import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { ComponentPropsWithRef, ElementType, forwardRef, Fragment, ReactNode } from 'react';
import { Icon, IconProps } from '../Icon';
import { sizeMapper } from './utils';

export type IconButtonProps<T extends ElementType = 'button'> = ButtonBaseProps<T> & {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large';
  name?: IconProps['name']
  onClick?: () => void;
}

type IconButtonComponent = <T extends ElementType = 'button'>(props: IconButtonProps<T>) => ReactNode | null;

/** Primary UI component for user interaction */
export const IconButton: IconButtonComponent = forwardRef(<T extends ElementType>({
  size = 'medium',
  disabled,
  variant = 'primary',
  appearance = 'fill',
  type = 'button',
  name,
  as,
  children,
 ...props
}: IconButtonProps<T>, ref: ComponentPropsWithRef<T>['ref']) => {
  return (
    <ButtonBase
      as={as}
      ref={ref}
      type={type}
      disabled={disabled}
      className={style.iconButton}
      data-size={size}
      variant={variant}
      appearance={appearance}
      {...props}
    >
      {children ? children : name ? <Icon color='currentColor' name={name} size={sizeMapper(size)} /> : <Fragment />}
    </ButtonBase>
  );
});
