'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { SliderContext, SliderContextState } from './context.ts';

export type SliderProviderProps = SliderContextState

export const SliderProvider: FC<PropsWithChildren<SliderProviderProps>> = ({
  step,
  min,
  max,
  value,
  orientation,
  disabled,
  children
}) => {
  const providerValue = useMemo(() => ({
    step,
    min,
    max,
    value,
    orientation,
    disabled,
  }), [
    step,
    min,
    max,
    value,
    orientation,
    disabled
  ])

  return (
    <SliderContext.Provider value={providerValue}>
      {children}
    </SliderContext.Provider>
  )
}