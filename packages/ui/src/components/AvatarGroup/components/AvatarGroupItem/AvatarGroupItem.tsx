'use client';

import { FC, PropsWithChildren } from 'react';
import { csx } from '@adara-cs/utils';
import { Avatar, AvatarProps } from '../../../Avatar';
import { useAvatarGroupContext } from '../../hooks';

export type AvatarGroupItemProps = AvatarProps

export const AvatarGroupItem: FC<PropsWithChildren<AvatarGroupItemProps>> = ({
  className,
  children,
  ...props
}) => {
  const { avatarClass, size, variant } = useAvatarGroupContext()

  return (
    <Avatar
      className={csx(avatarClass, className)}
      size={size}
      variant={variant}
      {...props}
    >
      {children}
    </Avatar>
  )
}