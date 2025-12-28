'use client';

import { createContext } from '@vega-ui/react-context';
import { SegmentedControlValue } from '../../types';

export interface segmentedControlItemContextState {
  value: SegmentedControlValue
}

export const [SegmentedControlItemProvider, useSegmentedControlItemContext] = createContext<segmentedControlItemContextState>('segmentedControlItemContext', {
  value: '',
})