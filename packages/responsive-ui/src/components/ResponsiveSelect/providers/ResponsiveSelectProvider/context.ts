'use client';

import { Context, createContext } from 'react';

export interface ResponsiveSelectContextState {
  isBreakpoint: boolean
}

export const defaultResponsiveSelectContext: ResponsiveSelectContextState = {
  isBreakpoint: false,
}

export const ResponsiveSelectContext: Context<ResponsiveSelectContextState> = createContext(defaultResponsiveSelectContext)