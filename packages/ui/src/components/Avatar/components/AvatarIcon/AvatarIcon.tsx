import { FC } from 'react';
import { Icon, IconProps } from '../../../Icon';
import style from './style.module.css';
import { csx } from '@adara-cs/utils';

export type AvatarIconProps = IconProps

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