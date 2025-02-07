'use client';

import { useContext } from 'react';
import { SelectContext, SelectContextState } from '../providers/SelectProvider/context.ts';

export const useSelectContext = (): SelectContextState => useContext(SelectContext)