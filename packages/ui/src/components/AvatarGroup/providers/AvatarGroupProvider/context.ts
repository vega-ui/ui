'use client';

import { Context, createContext } from 'react';
import { AvatarProps } from '../../../Avatar';

export interface AvatarGroupContextState {
  size?: AvatarProps['size']
  variant?: AvatarProps['variant']
  avatarClass?: AvatarProps['className']
  hiddenCount?: number
}

export const defaultAvatarGroupContext: AvatarGroupContextState = {
  size: 'md',
  variant: 'primary'
}

export const AvatarGroupContext: Context<AvatarGroupContextState> = createContext(defaultAvatarGroupContext)