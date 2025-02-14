'use client';

import { useContext } from 'react';
import {
  ResponsiveModalContext,
  ResponsiveModalContextState
} from '../providers/ResponsiveModalProvider/context.ts';

export const useResponsiveModalContext = (): ResponsiveModalContextState => useContext(ResponsiveModalContext)