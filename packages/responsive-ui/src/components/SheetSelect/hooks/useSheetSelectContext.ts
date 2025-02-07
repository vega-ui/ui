'use client';

import { useContext } from 'react';
import { SheetSelectContext, SheetSelectContextState } from '../providers/SheetSelectProvider/context.ts';

export const useSheetSelectContext = (): SheetSelectContextState => useContext(SheetSelectContext)