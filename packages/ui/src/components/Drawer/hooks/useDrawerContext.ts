'use client';

import { useContext } from 'react';
import { DrawerContext, DrawerContextState } from '../providers';

export const useDrawerContext = (): DrawerContextState => useContext(DrawerContext)