'use client';
import { FC, Ref, TableHTMLAttributes } from 'react';
import style from './style.module.css'
import { TableProvider } from './providers';
import { csx } from '@adara-cs/utils';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  className?: string
  containerClassName?: string
  dataAlign?: 'start' | 'center' | 'end' | 'between'
  edgePadded?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  ref?: Ref<HTMLTableElement>
}

export const Table: FC<TableProps> = ({
  dataAlign = 'between',
  fullHeight,
  fullWidth,
  edgePadded = false,
  className,
  containerClassName,
  children,
  ref,
  ...props
}) => {
  return (
    <TableProvider dataAlign={dataAlign} edgePadded={edgePadded}>
      <div className={csx(style.tableContainer, containerClassName)}>
        <table {...props} data-edge-padded={edgePadded} data-full-width={fullWidth} data-full-height={fullHeight} ref={ref}
               className={csx(style.table, className)} data-align={dataAlign}>
          {children}
        </table>
      </div>
    </TableProvider>
  )
}