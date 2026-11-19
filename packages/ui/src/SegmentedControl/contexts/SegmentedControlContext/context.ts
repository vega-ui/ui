'use client';

import { createContext } from '../../../internals/context';
import { SegmentedControlSize, SegmentedControlValue, SegmentedControlVariant } from '../../types';

export interface SegmentedControlContextState {
  size?: SegmentedControlSize
  disabled?: boolean
  variant?: SegmentedControlVariant
  selected?: SegmentedControlValue
  defaultSelected?: SegmentedControlValue
  name?: string
  onChangeValue?(value: SegmentedControlValue): void
}

export const [SegmentedControlProvider, useSegmentedControlContext] = createContext<SegmentedControlContextState>('SegmentedControlContext', {
  size: undefined,
  disabled: undefined,
})