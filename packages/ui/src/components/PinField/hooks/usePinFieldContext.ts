'use client';

import { useContext } from 'react';
import { PinContext, PinFieldContextState } from '../providers/PinFieldProvider/context.ts';

export const usePinFieldContext = (): PinFieldContextState => useContext(PinContext)