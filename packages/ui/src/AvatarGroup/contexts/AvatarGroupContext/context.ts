'use client';

import { AvatarProps, AvatarSize, AvatarVariant } from '../../../Avatar';
import { createContext } from '@vega-ui/react-context';

export interface AvatarGroupContextState {
  size?: AvatarSize
  variant?: AvatarVariant
  avatarClass?: AvatarProps['className']
  hiddenCount?: number
}

export const [AvatarGroupProvider, useAvatarGroupContext] = createContext<AvatarGroupContextState>('AvatarGroupContext', {
  size: 'md',
  variant: 'primary'
})