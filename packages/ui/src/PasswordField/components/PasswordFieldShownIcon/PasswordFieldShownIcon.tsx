import { FC } from 'react';
import { Icon, IconProps } from '../../../Icon';
import { useOutput } from '../../../internals/widget';
import { usePasswordFieldContext } from '../../contexts';
import { passwordFieldWidget } from '@vega-ui/widgets/password-field';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type PasswordFieldShownIconProps = IconProps

/**
 * `PasswordFieldShownIcon` shows its children while the password of the `PasswordField` is hidden, offering to show it, and has `data-hidden` otherwise. Pass the icon as its children, such as an eye.
 */
export const PasswordFieldShownIcon: FC<PasswordFieldShownIconProps> = ({ children, className, ...props }) => {
  const { handle } = usePasswordFieldContext()
  const attrs = useOutput(handle, passwordFieldWidget.output.shownIcon)
  
  return (
    <Icon className={csx(style.icon, className)} {...attrs} {...props}>
      {children}
    </Icon>
  )
}