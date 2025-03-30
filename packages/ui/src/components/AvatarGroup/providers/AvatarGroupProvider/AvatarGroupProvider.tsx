'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { AvatarGroupContext, AvatarGroupContextState } from './context.ts';

export const AvatarGroupProvider: FC<PropsWithChildren<AvatarGroupContextState>> = ({ size, hiddenCount, variant, avatarClass, children }) => {
  const providerValue = useMemo(() => ({
    size,
    variant,
    avatarClass,
    hiddenCount,
  }), [size, variant, avatarClass, hiddenCount])

  return (
    <AvatarGroupContext.Provider value={providerValue}>
      {children}
    </AvatarGroupContext.Provider>
  )
}