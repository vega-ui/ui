'use client';

import { type DefaultCollapsibleContext, defaultCollapsibleContext } from './defaultContext.ts';
import { Context, createContext } from 'react';

export const CollapsibleContext: Context<DefaultCollapsibleContext> = createContext(defaultCollapsibleContext)