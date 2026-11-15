'use client';

import { createContext } from '../../../internals/context';
import { PaginationSize, PaginationVariant } from '../../types';

export interface PaginationContextState {
  size?: PaginationSize
  variant?: PaginationVariant
}

export const [PaginationProvider, usePaginationContext] = createContext<PaginationContextState>('PaginationContext', {
  size: 'md',
  variant: 'primary',
})