import style from './button.module.css';
import { Icon } from '../Icon'

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type='button'
      className={style.button}
      style={{ backgroundColor }}
      {...props}
    >
      <Icon name='support' />
      {label}
    </button>
  );
};
