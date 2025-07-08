'use client';

import { Context, createContext } from 'react';
import { IconButtonProps } from '../../../IconButton';
import { PaginationSize } from '../../types.ts';

export interface PaginationContextState {
  size?: PaginationSize
  variant?: IconButtonProps['variant']
}

export const defaultPaginationContext: PaginationContextState = {
  size: 'medium',
  variant: 'primary',
}

export const PaginationContext: Context<PaginationContextState> = createContext(defaultPaginationContext)