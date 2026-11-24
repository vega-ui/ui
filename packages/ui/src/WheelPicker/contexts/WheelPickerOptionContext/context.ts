'use client';

import { createContext } from '../../../internals/context';

export interface WheelPickerOptionContextState {
  index: number
  label: string
}

export const [WheelPickerOptionProvider, useWheelPickerOptionContext] = createContext<WheelPickerOptionContextState>('WheelPickerOptionContext', { index: 0, label: '' })
