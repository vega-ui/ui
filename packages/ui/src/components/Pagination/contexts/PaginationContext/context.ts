'use client';

import { createContext } from '@vega-ui/react-context';
import { IconButtonProps } from '../../../IconButton';
import { PaginationSize } from '../../types.ts';

export interface PaginationContextState {
  size?: PaginationSize
  variant?: IconButtonProps['variant']
}

export const [PaginationProvider, usePaginationContext] = createContext<PaginationContextState>('PaginationContext', {
  size: 'medium',
  variant: 'primary',
})