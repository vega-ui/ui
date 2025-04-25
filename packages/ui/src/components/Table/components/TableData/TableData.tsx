'use client';
import { FC, PropsWithChildren, TdHTMLAttributes } from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'
import { useTable } from '../../hooks';
import { TableProps } from '../../Table.tsx';

export interface TableDataProps extends TdHTMLAttributes<HTMLTableDataCellElement> {
  /**
   * Controls horizontal alignment of the cell’s content.
   * Inherits from TableProps and typically affects text alignment or flex layout.
   *
   * - 'start' | 'center' | 'end' | 'between'
   */
  dataAlign?: TableProps['dataAlign']
}

/** The TableData component represents a single `<td>` cell within a Table, supporting semantic HTML attributes and optional content alignment via the dataAlign prop for layout consistency */
export const TableData: FC<PropsWithChildren<TableDataProps>> = ({ children, className, dataAlign, ...props }) => {
  const { dataAlign: contextDataAlign, edgePadded } = useTable()

  return (
    <td {...props} data-align={dataAlign ?? contextDataAlign} className={csx(style.data, !edgePadded ? style.dataNotEdgePadded : undefined, className)}>
      {children}
    </td>
  )
}