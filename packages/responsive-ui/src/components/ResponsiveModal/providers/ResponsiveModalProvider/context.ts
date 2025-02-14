'use client';

import { Context, createContext } from 'react';

export interface ResponsiveModalContextState {
  isBreakpoint: boolean
}

export const defaultResponsiveModalContext: ResponsiveModalContextState = {
  isBreakpoint: false,
}

export const ResponsiveModalContext: Context<ResponsiveModalContextState> = createContext(defaultResponsiveModalContext)