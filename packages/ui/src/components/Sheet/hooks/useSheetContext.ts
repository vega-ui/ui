'use client';

import { useContext } from 'react';
import { SheetContext, SheetContextState } from '../providers';

export const useSheetContext = (): SheetContextState => useContext(SheetContext)