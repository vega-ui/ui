'use client';

import { useContext } from 'react';
import { PageControlContextState, PageControlContext } from '../providers';

export const usePageControlContext = (): PageControlContextState => useContext(PageControlContext)