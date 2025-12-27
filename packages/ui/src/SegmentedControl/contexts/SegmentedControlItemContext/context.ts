'use client';

import { createContext } from '@vega-ui/react-context';
import { SegmentedControlValue } from '../../types.ts';

export interface segmentedControlItemContextState {
  value: SegmentedControlValue
}

export const [SegmentedControlItemProvider, useSegmentedControlItemContext] = createContext<segmentedControlItemContextState>('segmentedControlItemContext', {
  value: '',
})