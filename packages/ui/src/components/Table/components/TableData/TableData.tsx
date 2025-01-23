'use client';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'
import { useTable } from '../../hooks';
import { TableProps } from '../../Table.tsx';

export interface TableDataProps extends HTMLAttributes<HTMLTableDataCellElement> {
  dataAlign?: TableProps['dataAlign']
}

export const TableData: FC<PropsWithChildren<TableDataProps>> = ({ children, className, dataAlign, ...props }) => {
  const { dataAlign: contextDataAlign, edgePadded } = useTable()

  return (
    <td {...props} data-align={dataAlign ?? contextDataAlign} className={csx(style.data, !edgePadded ? style.dataNotEdgePadded : undefined, className)}>
      {children}
    </td>
  )
}