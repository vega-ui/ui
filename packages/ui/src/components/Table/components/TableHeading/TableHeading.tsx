import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'
import { TableProps } from '../../Table.tsx';
import { useTable } from '../../hooks';

export interface TableHeadingProps extends HTMLAttributes<HTMLTableHeaderCellElement> {
  dataAlign?: TableProps['dataAlign']
}

export const TableHeading: FC<PropsWithChildren<TableHeadingProps>> = ({ children, className, dataAlign, ...props }) => {
  const { dataAlign: contextDataAlign, edgePadded } = useTable()

  return (
    <th {...props} data-align={dataAlign ?? contextDataAlign} className={csx(style.heading, !edgePadded ? style.headingNotEdgePadded : undefined, className)}>
      {children}
    </th>
  )
}