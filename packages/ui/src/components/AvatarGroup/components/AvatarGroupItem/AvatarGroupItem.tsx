'use client';

import { FC, PropsWithChildren } from 'react';
import { csx } from '@vega-ui/utils';
import { Avatar, AvatarProps } from '../../../Avatar';
import { useAvatarGroupContext } from '../../hooks';

export type AvatarGroupItemProps = AvatarProps

/**
 * The AvatarGroupItem component represents an individual avatar within an AvatarGroup, inheriting group-level styles like size and variant, and is typically used to visually stack or align multiple avatars in a compact layout
 * */
export const AvatarGroupItem: FC<PropsWithChildren<AvatarGroupItemProps>> = ({
  className,
  children,
  ...props
}) => {
  const { avatarClass, size, variant } = useAvatarGroupContext()

  return (
    <Avatar
      data-name='avatar'
      className={csx(avatarClass, className)}
      size={size}
      variant={variant}
      {...props}
    >
      {children}
    </Avatar>
  )
}