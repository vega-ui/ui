import style from './style.module.css';
import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { ElementType, Fragment, ReactNode, Ref, MouseEvent } from 'react';
import { Icon, IconProps } from '../Icon';
import { sizeMapper } from './utils';
import { csx } from '@adara-cs/utils';
import { PolymorphicComponentPropWithRef } from '@adara-cs/types';

export type IconButtonProps<T extends ElementType> = PolymorphicComponentPropWithRef<T, ButtonBaseProps<T> & {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large'
  iconSize?: IconProps['size']
  name?: IconProps['name']
  onClick?: (e: MouseEvent) => void;
  className?: string
}>

type IconButtonComponent = <T extends ElementType = 'button'>(props: IconButtonProps<T>) => ReactNode | null;

/** Primary UI component for user interaction */
export const IconButton: IconButtonComponent = <T extends ElementType>({
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
