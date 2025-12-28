'use client';

import { ChangeEvent } from 'react';
import { createContext } from '@vega-ui/react-context';
import { SegmentedControlSize, SegmentedControlValue, SegmentedControlVariant } from '../../types';

export interface SegmentedControlContextState {
  size?: SegmentedControlSize
  disabled?: boolean
  variant?: SegmentedControlVariant
  selected?: SegmentedControlValue
  name?: string
  onChange?(e: ChangeEvent<HTMLInputElement>): void
  itemRef?(key: SegmentedControlValue): (element: HTMLLabelElement) => void
}

export const [SegmentedControlProvider, useSegmentedControlContext] = createContext<SegmentedControlContextState>('SegmentedControlContext', {
  size: undefined,
  disabled: undefined,
})