import { FC, MouseEvent } from 'react';
import { IconButton, IconButtonProps } from '../../../IconButton';
import { useTextFieldContext } from '../../../TextField/contexts';
import { useOutput } from '../../../internals/widget';
import { usePasswordFieldContext } from '../../contexts';
import { passwordFieldWidget } from '@vega-ui/widgets/password-field';
import style from './style.module.css';
import { csx } from '@vega-ui/utils';

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
export const PasswordFieldToggleIconButton: FC<PasswordFieldToggleIconButtonProps> = ({ disabled, className, children, onClick: _onClick, type = 'button', ...props }) => {
  const { size } = useTextFieldContext()
  const { handle, toggleShow, disabled: _disabled } = usePasswordFieldContext()
  const attrs = useOutput(handle, passwordFieldWidget.output.toggle)

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    _onClick?.(event)
    if (!event.defaultPrevented) toggleShow()
  }
  
  return (
    <IconButton
      type={type}
      size={size}
      className={csx(style.button, className)}
      disabled={disabled ?? _disabled}
      variant='secondary'
      appearance='transparent'
      {...attrs}
      onClick={onClick}
      {...props}
    >
      {children}
    </IconButton>
  )
}