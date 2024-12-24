import style from './style.module.css';
import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { ElementType, forwardRef, Fragment, ReactNode } from 'react';
import { Icon, IconProps } from '../Icon';
import { sizeMapper } from './utils';
import { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../../utils';
import { csx } from '../../utils/css';

export type IconButtonProps<T extends ElementType> = PolymorphicComponentPropWithRef<T, ButtonBaseProps<T> & {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large';
  name?: IconProps['name']
  onClick?: () => void;
  className?: string
}>

type IconButtonComponent = <T extends ElementType>(props: IconButtonProps<T>) => ReactNode | null;

/** Primary UI component for user interaction */
export const IconButton: IconButtonComponent = forwardRef(<T extends ElementType>({
  size = 'medium',
  disabled,
  variant = 'primary',
  appearance = 'fill',
  type = 'button',
  className,
  name,
  children,
 ...props
}: IconButtonProps<T>, ref: PolymorphicRef<T>) => {
  return (
    <ButtonBase
      type={type}
      {...(props as Record<string, unknown>)}
      ref={ref}
      disabled={disabled}
      className={csx(style.iconButton, className)}
      data-size={size}
      variant={variant}
      appearance={appearance}
    >
      {children ? children : name ? <Icon color='currentColor' name={name} size={sizeMapper(size)} /> : <Fragment />}
    </ButtonBase>
  );
});
