import { FC } from 'react';
import { Icon, IconProps } from '../../../Icon';
import { useOutput } from '../../../internals/widget';
import { usePasswordFieldContext } from '../../contexts';
import { passwordFieldWidget } from '@vega-ui/widgets/password-field';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export type PasswordFieldHiddenIconProps = IconProps

/**
 * `PasswordFieldHiddenIcon` shows its children while the password of the `PasswordField` is shown, offering to hide it, and has `data-hidden` otherwise. Pass the icon as its children, such as a crossed out eye.
 */
export const PasswordFieldHiddenIcon: FC<PasswordFieldHiddenIconProps> = ({ children, className, ...props }) => {
  const { handle } = usePasswordFieldContext()
  const attrs = useOutput(handle, passwordFieldWidget.output.hiddenIcon)
  
  return (
    <Icon className={csx(style.icon, className)} {...attrs} {...props}>
      {children}
    </Icon>
  )
}