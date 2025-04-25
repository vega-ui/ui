import { FC } from 'react';
import { Icon, IconProps } from '../../../Icon';
import style from './style.module.css';
import { csx } from '@adara-cs/utils';

export type AvatarIconProps = IconProps

/**
 * The AvatarIcon component displays a static or symbolic icon within the Avatar, often used when no user image is available and a visual representation (like a person icon) is desired for identity fallback.
 */
export const AvatarIcon: FC<AvatarIconProps> = ({
  className,
  ...props
}) => {
  return (
    <Icon
      className={csx(style.icon, className)}
      {...props}
    />
  )
}