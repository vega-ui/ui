'use client';

import { useContext } from 'react';
import { AvatarGroupContext, AvatarGroupContextState } from '../providers/AvatarGroupProvider/context.ts';

export const useAvatarGroupContext = (): AvatarGroupContextState => useContext(AvatarGroupContext)