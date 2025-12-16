import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import { Icon, IconProps } from '../../../Icon';
import { iconMapper } from './helpers';
import style from './style.module.css'
import { useAlertContext } from '../../contexts';

export type AlertIconProps = IconProps

/**
 * AlertIcon displays a contextual icon for an Alert based on its variant.
 * It provides a visual cue that reinforces the meaning or severity
 * of the alert (e.g. success, warning, error).
 *
 * By default, the icon is automatically selected according to the
 * current Alert variant. A custom icon can be provided via children
 * to override the default mapping.
 */
export const AlertIcon: FC<AlertIconProps> = ({ children, className, ...props }) => {
  const { variant } = useAlertContext()
  return <Icon size='md' className={csx(style.icon, className)} {...props}>{children ?? iconMapper[variant]}</Icon>
}