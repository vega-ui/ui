'use client';
import { forwardRef, PropsWithChildren, TableHTMLAttributes } from 'react';
import style from './style.module.css'
import { Text } from '../Text';
import { TableProvider } from './providers';
import { csx } from '@adara-cs/utils';
import { TableData, TableHead, TableHeading, TableRow, TableBody, TableFoot } from './components';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  className?: string
  containerClassName?: string
  dataAlign?: 'start' | 'center' | 'end' | 'between'
  edgePadded?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
}

export const Table = forwardRef<HTMLTableElement, PropsWithChildren<TableProps>>(({
  dataAlign = 'between',
  fullHeight,
  fullWidth,
  edgePadded = false,
  className,
  containerClassName,
  ...props
}, ref) => {
  return (
    <TableProvider dataAlign={dataAlign} edgePadded={edgePadded}>
      <div className={csx(style.tableContainer, containerClassName)}>
        <table {...props} data-edge-padded={edgePadded} data-full-width={fullWidth} data-full-height={fullHeight} ref={ref}
               className={csx(style.table, className)} data-align={dataAlign}>
          <TableHead>
            <TableRow className={style.tableRow}>
              <TableHeading className={style.tableHeading}>
                <Text>Модель</Text>
              </TableHeading>
              <TableHeading className={style.tableHeading}>
                <Text>Модель</Text>
              </TableHeading>
              <TableHeading className={style.tableHeading}>
                <Text>Цена</Text>
              </TableHeading>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className={style.tableRow}>
              <TableData >
                <Text>iPhone 12 Pro</Text>
              </TableData>
              <TableData >
                <Text>iPhone 12 Pro</Text>
              </TableData>
              <TableData >
                <Text>$999</Text>
              </TableData>
            </TableRow>
            <TableRow className={style.tableRow}>
              <TableData >
                <Text>iPhone 12 Pro</Text>
              </TableData>
              <TableData >
                <Text>iPhone 12 Pro</Text>
              </TableData>
              <TableData >
                <Text>$999</Text>
              </TableData>
            </TableRow>
            <TableRow className={style.tableRow}>
              <TableData >
                <Text>iPhone 12 Pro</Text>
              </TableData>
              <TableData >
                <Text>iPhone 12 Pro</Text>
              </TableData>
              <TableData >
                <Text>$999</Text>
              </TableData>
            </TableRow>
          </TableBody>
          <TableFoot>
            <TableRow className={style.tableRow}>
              <TableData >
                <Text>Средняя цена:</Text>
              </TableData>
              <TableData />
              <TableData >
                <Text>$758.8</Text>
              </TableData>
            </TableRow>
          </TableFoot>
        </table>
      </div>
    </TableProvider>
  )
})