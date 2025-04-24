'use client';

import { useContext } from 'react';
import { PaginationContext, PaginationContextState } from '../providers';

export const usePaginationContext = (): PaginationContextState => useContext(PaginationContext)