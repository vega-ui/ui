import { FC } from 'react';
import { Icon, IconProps } from '../../../Icon';
import { EyeOffIcon } from '@vega-ui/icons';
import { usePasswordFieldContext } from '../../contexts';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export type PasswordFieldHiddenIconProps = IconProps

/**
 * `PasswordFieldHiddenIcon` is a visual icon used within `PasswordField`
 * to indicate that the password is currently hidden (masked).
 *
 * It reads the visibility state from `PasswordField` context and reflects it
 * via the `data-hidden` attribute, allowing styles or animations to respond
 * to visibility changes.
 *
 * The component is purely presentational and supports icon replacement
 * through the `children` prop.
 */
export const PasswordFieldHiddenIcon: FC<PasswordFieldHiddenIconProps> = ({ children, className, ...props }) => {
  const { shown } = usePasswordFieldContext()
  
  return (
    <Icon className={csx(style.icon, className)} data-hidden={!shown} {...props}>
      {children ?? <EyeOffIcon />}
    </Icon>
  )
}