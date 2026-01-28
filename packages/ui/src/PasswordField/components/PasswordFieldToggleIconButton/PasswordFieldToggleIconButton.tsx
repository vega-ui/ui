import { FC } from 'react';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { useTextFieldContext } from '../../../TextField/contexts';
import { usePasswordFieldContext } from '../../contexts';
import style from './style.module.css';

export type PasswordFieldToggleIconButtonProps = IconButtonProps

/**
 * `PasswordFieldToggleButton` is an action button used within `PasswordField`
 * to toggle password visibility.
 *
 * It connects to `PasswordField` context to switch between hidden and shown
 * states and inherits sizing from the surrounding `TextField` for visual
 * consistency.
 *
 * The button does not manage any state itself and is intended to be composed
 * with visibility icons inside `PasswordField`.
 */
export const PasswordFieldToggleIconButton: FC<PasswordFieldToggleIconButtonProps> = ({ disabled, children, ...props }) => {
  const { size } = useTextFieldContext()
  const { toggleShow, disabled: _disabled } = usePasswordFieldContext()
  
  return (
    <IconButton
      size={size}
      className={style.controlButton}
      disabled={disabled ?? _disabled}
      variant='secondary'
      appearance='transparent'
      onClick={toggleShow}
      {...props}
    >
      {children}
    </IconButton>
  )
}