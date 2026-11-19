'use client';

import { FC } from 'react';
import { csx } from '@vega-ui/utils';
import { Avatar, AvatarProps } from '../../../Avatar';
import { useAvatarStackContext } from '../../contexts';
import style from './style.module.css'

export type AvatarStackItemProps = AvatarProps

/**
 * The AvatarStackItem component represents an individual avatar within an AvatarStack, inheriting stack-level styles like size and variant, and is typically used to visually stack or align multiple avatars in a compact layout
 * */
export const AvatarStackItem: FC<AvatarStackItemProps> = ({
  className,
  ...props
}) => {
  const { size, variant } = useAvatarStackContext()

  return <Avatar className={csx(style.avatar, className)} size={size} variant={variant} {...props} />
}