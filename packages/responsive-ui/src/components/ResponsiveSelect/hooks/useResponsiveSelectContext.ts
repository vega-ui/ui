'use client';

import { useContext } from 'react';
import {
  ResponsiveSelectContext,
  ResponsiveSelectContextState
} from '../providers/ResponsiveSelectProvider/context.ts';

export const useResponsiveSelectContext = (): ResponsiveSelectContextState => useContext(ResponsiveSelectContext)