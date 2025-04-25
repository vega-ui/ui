'use client';
import { FC, PropsWithChildren, ThHTMLAttributes } from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css'
import { TableProps } from '../../Table.tsx';
import { useTable } from '../../hooks';

export interface TableHeadingProps extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
  /**
   * Controls horizontal alignment of the heading content.
   * Inherits from TableProps and typically affects text or layout alignment.
   *
   * - 'start' | 'center' | 'end' | 'between'
   */
  dataAlign?: TableProps['dataAlign']
}

/** The TableHeading component represents a single `<th>` cell within the table header (`<thead>`), supporting semantic labeling and optional content alignment via the dataAlign prop for consistent column layout */
export const TableHeading: FC<PropsWithChildren<TableHeadingProps>> = ({ children, className, dataAlign, ...props }) => {
  const { dataAlign: contextDataAlign, edgePadded } = useTable()

  return (
    <th {...props} data-align={dataAlign ?? contextDataAlign} className={csx(style.heading, !edgePadded ? style.headingNotEdgePadded : undefined, className)}>
      {children}
    </th>
  )
}