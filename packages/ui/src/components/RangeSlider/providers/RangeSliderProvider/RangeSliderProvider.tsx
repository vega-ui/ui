'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { RangeSliderContext, RangeSliderContextState } from './context.ts';

export type RangeSliderProviderProps = RangeSliderContextState

export const RangeSliderProvider: FC<PropsWithChildren<RangeSliderProviderProps>> = ({
  step,
  min,
  max,
  value,
  orientation,
  size,
  minRange,
  children
}) => {
  const providerValue = useMemo(() => ({
    step, min, max, value, orientation, size, minRange,
  }), [step, min, max, value, orientation, size, minRange])

  return (
    <RangeSliderContext.Provider value={providerValue}>
      {children}
    </RangeSliderContext.Provider>
  )
}