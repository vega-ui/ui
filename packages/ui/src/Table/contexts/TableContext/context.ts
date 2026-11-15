'use client';

import { createContext } from '../../../internals/context';

export interface TableContextData {
  dataAlign?: 'start' | 'center' | 'end' | 'between'
  edgePadded?: boolean
}

export const [TableProvider, useTableContext] = createContext<TableContextData>('TableContext', {
  dataAlign: undefined,
  edgePadded: undefined
})