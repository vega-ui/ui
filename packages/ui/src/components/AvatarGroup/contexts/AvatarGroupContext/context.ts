'use client';

import { AvatarProps } from '../../../Avatar';
import { createContext } from '@vega-ui/react-context';

export interface AvatarGroupContextState {
  size?: AvatarProps['size']
  variant?: AvatarProps['variant']
  avatarClass?: AvatarProps['className']
  hiddenCount?: number
}

export const [AvatarGroupProvider, useAvatarGroupContext] = createContext<AvatarGroupContextState>('AvatarGroupContext', {
  size: 'md',
  variant: 'primary'
})