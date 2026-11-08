'use client';

import { createContext } from '@vega-ui/react-kit/context';
import { PaginationSize, PaginationVariant } from '../../types';

export interface PaginationContextState {
  size?: PaginationSize
  variant?: PaginationVariant
}

export const [PaginationProvider, usePaginationContext] = createContext<PaginationContextState>('PaginationContext', {
  size: 'md',
  variant: 'primary',
})