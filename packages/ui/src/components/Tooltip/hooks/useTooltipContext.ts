'use client';

import { useContext } from 'react';
import { TooltipContextState, TooltipContext } from '../providers';

export const useTooltipContext = (): TooltipContextState => useContext(TooltipContext)