'use client';

import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import { Avatar, AvatarProps } from '../../../Avatar';
import { useAvatarGroupContext } from '../../contexts';
import style from './style.module.css'

export type AvatarGroupStackItemProps = AvatarProps

/**
 * The AvatarGroupStackItem component represents an individual avatar within an AvatarGroup, inheriting group-level styles like size and variant, and is typically used to visually stack or align multiple avatars in a compact layout
 * */
export const AvatarGroupStackItem: FC<AvatarGroupStackItemProps> = ({
  className,
  ...props
}) => {
  const { size, variant } = useAvatarGroupContext()

  return (
    <Avatar className={csx(style.avatar, className)} size={size} variant={variant} {...props} />
  )
}