'use client';

import { useContext } from 'react';
import { SegmentedControlContextState, SegmentedControlContext } from '../providers';

export const useSegmentedControlContext = (): SegmentedControlContextState => useContext(SegmentedControlContext)