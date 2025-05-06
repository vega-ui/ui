'use client';
import { FC, Ref, TableHTMLAttributes } from 'react';
import style from './style.module.css'
import { TableProvider } from './providers';
import { csx } from '@vega-ui/utils';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /**
   * Custom class name applied to the `<table>` element.
   */
  className?: string

  /**
   * Optional class name for the outer container that wraps the table.
   * Useful for scrolling, padding, or layout constraints.
   */
  containerClassName?: string

  /**
   * Defines the alignment strategy for table data cells.
   *
   * - 'start': Aligns content to the left
   * - 'center': Centers content
   * - 'end': Aligns content to the right
   * - 'between': Distributes space evenly between cells
   */
  dataAlign?: 'start' | 'center' | 'end' | 'between'

  /**
   * Adds horizontal padding to the edges of the table container.
   * Useful when the table should not stretch to the viewport edge.
   */
  edgePadded?: boolean

  /**
   * Makes the table stretch to fill the full width of its container.
   */
  fullWidth?: boolean

  /**
   * Makes the table stretch to fill the full height of its container.
   * Useful for layouts with scrollable or pinned regions.
   */
  fullHeight?: boolean

  /**
   * Ref to the native HTML `<table>` element.
   * Useful for focus, measurement, or imperative access.
   */
  ref?: Ref<HTMLTableElement>
}

/** The Table component is a flexible, styled wrapper around the native table element that supports responsive layout, alignment control, and customizable container behavior for rendering structured data */
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