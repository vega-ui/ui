import {
  defaultDrawerContext,
  DefaultDrawerContext
} from './defaultContext.ts';
import { Context, createContext } from 'react';

export const DrawerContext: Context<DefaultDrawerContext> = createContext(defaultDrawerContext)