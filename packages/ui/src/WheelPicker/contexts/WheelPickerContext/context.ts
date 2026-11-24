'use client';

import { createContext } from '../../../internals/context';

export interface WheelPickerContextState {
  rows: number
}

export const [WheelPickerProvider, useWheelPickerContext] = createContext<WheelPickerContextState>('WheelPickerContext', { rows: 5 })
