import { type TableContextData, defaultTableContext } from './defaultContext.ts';
import { Context, createContext } from 'react';

export const TableContext: Context<TableContextData> = createContext(defaultTableContext)