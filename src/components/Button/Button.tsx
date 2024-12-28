import style from './style.module.css';
import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { ElementType, forwardRef, ReactNode } from 'react';
import { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../../utils';
import { csx } from '../../utils/css';

export type ButtonProps<T extends ElementType> = PolymorphicComponentPropWithRef<T, ButtonBaseProps<T> & {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}>

type ButtonComponent = <T extends ElementType = 'button'>(props: ButtonProps<T>) => ReactNode | null;

/** Primary UI component for user interaction */
export const Button: ButtonComponent = forwardRef(<T extends ElementType>({
  size = 'medium',
  disabled,
  children,
  variant = 'primary',
  appearance = 'fill',
  type = 'button',
  className,
  ...props
}: ButtonProps<T>, ref: PolymorphicRef<T>) => {
  return (
    <ButtonBase
      type={type}
      {...(props as Record<string, unknown>)}
      className={csx(style.button, className)}
      data-size={size}
      disabled={disabled}
      appearance={appearance}
      variant={variant}
      ref={ref}
    >
      {children}
    </ButtonBase>
  );
});
