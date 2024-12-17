import style from './style.module.css';
import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { ElementType, forwardRef, ReactNode } from 'react';
import { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../../utils';

export type ButtonProps<T extends ElementType> = PolymorphicComponentPropWithRef<T, ButtonBaseProps<T> & {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}>

type ButtonComponent = <T extends ElementType>(props: ButtonProps<T>) => ReactNode | null;

/** Primary UI component for user interaction */
export const Button: ButtonComponent = forwardRef(<T extends ElementType>({
  size = 'medium',
  disabled,
  children,
  variant = 'primary',
  appearance = 'fill',
  type = 'button',
  ...props
}: ButtonProps<T>, ref: PolymorphicRef<T>) => {
  return (
    <ButtonBase
      ref={ref}
      disabled={disabled}
      type={type}
      className={style.button}
      data-size={size}
      variant={variant}
      appearance={appearance}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </ButtonBase>
  );
});
