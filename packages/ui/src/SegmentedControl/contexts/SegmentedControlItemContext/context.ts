'use client';

import { createContext } from '../../../internals/context';
import { SegmentedControlValue } from '../../types';

export interface segmentedControlItemContextState {
  value: SegmentedControlValue
  disabled?: boolean
}

export const [SegmentedControlItemProvider, useSegmentedControlItemContext] = createContext<segmentedControlItemContextState>('segmentedControlItemContext', {
  value: '',
})