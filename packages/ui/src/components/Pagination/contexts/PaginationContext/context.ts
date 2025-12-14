'use client';

import { createContext } from '@vega-ui/react-context';
import { PaginationSize, PaginationVariant } from '../../types.ts';

export interface PaginationContextState {
  size?: PaginationSize
  variant?: PaginationVariant
}

export const [PaginationProvider, usePaginationContext] = createContext<PaginationContextState>('PaginationContext', {
  size: 'medium',
  variant: 'primary',
})