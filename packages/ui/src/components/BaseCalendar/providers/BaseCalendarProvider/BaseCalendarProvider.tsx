'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { BaseCalendarContext, BaseCalendarContextState } from './context.ts';

type BaseCalendarProviderProps = BaseCalendarContextState

export const BaseCalendarProvider: FC<PropsWithChildren<BaseCalendarProviderProps>> = ({
  size,
  variant,
  children
}) => {
  const value = useMemo(() => ({
    size,
    variant,
  }), [size, variant])

  return (
    <BaseCalendarContext.Provider value={value}>
      {children}
    </BaseCalendarContext.Provider>
  )
}