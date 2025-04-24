'use client';

import { Context, createContext } from 'react';
import { IconButtonProps } from '../../../IconButton';

export interface PaginationContextState {
  size?: IconButtonProps['size']
  variant?: IconButtonProps['variant']
}

export const defaultPaginationContext: PaginationContextState = {
  size: 'medium',
  variant: 'primary',
}

export const PaginationContext: Context<PaginationContextState> = createContext(defaultPaginationContext)