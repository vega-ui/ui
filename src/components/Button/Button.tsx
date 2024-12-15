import style from './style.module.css';
import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import { forwardRef, ReactNode } from 'react';

export interface ButtonProps extends ButtonBaseProps {
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  size = 'medium',
  disabled,
  children,
  variant = 'primary',
  appearance = 'fill',
  type = 'button',
  ...props
}, ref) => {
  return (
    <ButtonBase
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
