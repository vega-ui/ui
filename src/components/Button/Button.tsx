import style from './style.module.css';
import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { ComponentPropsWithRef, ElementType, forwardRef, ReactNode } from 'react';

export type ButtonProps<T extends ElementType = 'button'> = ButtonBaseProps<T> & {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
  onClick?: () => void;
}

type ButtonComponent = <T extends ElementType = 'button'>(props: ButtonProps<T>) => ReactNode | null;

/** Primary UI component for user interaction */
export const Button: ButtonComponent = forwardRef(<T extends ElementType>({
  size = 'medium',
  disabled,
  as,
  children,
  variant = 'primary',
  appearance = 'fill',
  type = 'button',
  ...props
}: ButtonProps<T>, ref: ComponentPropsWithRef<T>['ref']) => {
  return (
    <ButtonBase
      as={as}
      ref={ref}
      type={type}
      disabled={disabled}
      className={style.button}
      data-size={size}
      variant={variant}
      appearance={appearance}
      {...props}
    >
      {children}
    </ButtonBase>
  );
});
