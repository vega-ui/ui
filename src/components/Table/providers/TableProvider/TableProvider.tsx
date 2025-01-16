import { FC, PropsWithChildren, useMemo } from 'react';
import { TableContextData } from './defaultContext.ts';
import { TableContext } from './context.ts';

interface TableProvider {
  dataAlign?: TableContextData['dataAlign']
  edgePadded?: TableContextData['edgePadded']
}

export const TableProvider: FC<PropsWithChildren<TableProvider>> = ({ dataAlign, edgePadded, children }) => {
  const value = useMemo(() => ({
    dataAlign,
    edgePadded
  }), [dataAlign, edgePadded])

  return (
    <TableContext.Provider value={value}>
      {children}
    </TableContext.Provider>
  )
}