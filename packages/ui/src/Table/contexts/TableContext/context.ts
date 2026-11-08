'use client';

import { createContext } from '@vega-ui/react-kit/context';

export interface TableContextData {
  dataAlign?: 'start' | 'center' | 'end' | 'between'
  edgePadded?: boolean
}

export const [TableProvider, useTableContext] = createContext<TableContextData>('TableContext', {
  dataAlign: undefined,
  edgePadded: undefined
})