import { FC } from 'react';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { useTextFieldContext } from '../../../TextField/contexts';
import { usePasswordFieldContext } from '../../contexts';
import style from './style.module.css';
import { csx, mergeEventHandlers } from '@vega-ui/utils';

export type PasswordFieldToggleIconButtonProps = IconButtonProps

/**
 * `PasswordFieldToggleIconButton` is an action button used within `PasswordField`
 * to toggle password visibility. It keeps the focus and exposes the visibility
 * with `aria-pressed`, so give it a fixed label such as "Show password".
 *
 * It connects to the ` PasswordField ` context to switch between hidden and shown
 * states and inherits sizing from the surrounding `TextField` for visual
 * consistency.
 *
 * The button does not manage any state itself and is intended to be composed
 * with visibility icons inside `PasswordField`.
 */
export const PasswordFieldToggleIconButton: FC<PasswordFieldToggleIconButtonProps> = ({ disabled, className, children, onClick, ...props }) => {
  const { size } = useTextFieldContext()
  const { shown, toggleShow, disabled: _disabled } = usePasswordFieldContext()
  
  return (
    <IconButton
      size={size}
      className={csx(style.button, className)}
      disabled={disabled ?? _disabled}
      variant='secondary'
      appearance='transparent'
      aria-pressed={shown}
      onClick={mergeEventHandlers(toggleShow, onClick)}
      {...props}
    >
      {children}
    </IconButton>
  )
}