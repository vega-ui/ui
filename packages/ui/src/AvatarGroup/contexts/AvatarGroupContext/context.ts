'use client';

import { createContext } from '@vega-ui/react-context';
import { AvatarGroupSize, AvatarGroupVariant } from '../../types.ts';

export interface AvatarGroupContextState {
  size?: AvatarGroupSize
  variant?: AvatarGroupVariant
}

export const [AvatarGroupProvider, useAvatarGroupContext] = createContext<AvatarGroupContextState>('AvatarGroupContext', {
  size: 'md',
  variant: 'primary'
})