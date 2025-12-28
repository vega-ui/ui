'use client';

import { createContext } from '@vega-ui/react-context';
import { AvatarGroupSize, AvatarGroupVariant } from '../../types';

export interface AvatarGroupContextState {
  size?: AvatarGroupSize
  variant?: AvatarGroupVariant
}

export const [AvatarGroupProvider, useAvatarGroupContext] = createContext<AvatarGroupContextState>('CheckboxContext', {
  size: 'md',
  variant: 'primary'
})