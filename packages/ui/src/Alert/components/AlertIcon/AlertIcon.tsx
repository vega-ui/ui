import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import { Icon, IconProps } from '../../../Icon';
import style from './style.module.css'

export type AlertIconProps = IconProps

/**
 * AlertIcon places the icon of an Alert at its size, in the color of the Alert. Pass the icon as its children, such as an info, warning or check icon.
 */
export const AlertIcon: FC<AlertIconProps> = ({ children, className, ...props }) => {
  return <Icon size='md' className={csx(style.icon, className)} {...props}>{children}</Icon>
}