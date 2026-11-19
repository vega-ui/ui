'use client';

import { createContext } from '../../../internals/context';
import { AvatarStackSize, AvatarStackVariant } from '../../types';

export interface AvatarStackContextState {
  size?: AvatarStackSize
  variant?: AvatarStackVariant
}

export const [AvatarStackProvider, useAvatarStackContext] = createContext<AvatarStackContextState>('AvatarStackContext', {
  size: 'md',
  variant: 'primary'
})