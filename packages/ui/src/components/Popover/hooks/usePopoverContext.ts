'use client';

import { useContext } from 'react';
import { PopoverContext, PopoverContextState } from '../providers';

export const usePopoverContext = (): PopoverContextState => useContext(PopoverContext)