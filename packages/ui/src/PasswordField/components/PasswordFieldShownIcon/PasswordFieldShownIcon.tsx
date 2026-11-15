import { FC } from 'react';
import { Icon, IconProps } from '../../../Icon';
import { EyeIcon } from '@vega-ui/icons';
import { useOutput } from '../../../internals/widget';
import { usePasswordFieldContext } from '../../contexts';
import { passwordFieldWidget } from '@vega-ui/widgets/password-field';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type PasswordFieldShownIconProps = IconProps

/**
 * `PasswordFieldShownIcon` is a presentational icon used inside `PasswordField`
 * to indicate that the password is currently visible.
 *
 * The icon reacts to the visibility state provided by `PasswordField` context
 * and exposes it via a `data-hidden` attribute for styling and transitions.
 *
 * It does not handle any interactions or state itself and can be freely
 * replaced with a custom icon via `children`.
 */
export const PasswordFieldShownIcon: FC<PasswordFieldShownIconProps> = ({ children, className, ...props }) => {
  const { handle } = usePasswordFieldContext()
  const attrs = useOutput(handle, passwordFieldWidget.output.shownIcon)
  
  return (
    <Icon className={csx(style.icon, className)} {...attrs} {...props}>
      {children ?? <EyeIcon />}
    </Icon>
  )
}