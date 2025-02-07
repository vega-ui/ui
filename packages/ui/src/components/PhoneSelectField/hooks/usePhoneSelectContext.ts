'use client';

import { useContext } from 'react';
import { PhoneSelectContext, PhoneSelectContextState } from '../providers/PhoneSelectProvider/context.ts';

export const usePhoneSelectContext = (): PhoneSelectContextState => useContext(PhoneSelectContext)