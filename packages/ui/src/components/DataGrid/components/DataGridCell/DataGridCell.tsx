import { FC, HTMLAttributes, PropsWithChildren, Ref } from 'react';
import style from './style.module.css'
import { csx, mergeRefs } from '@vega-ui/utils';
import { useDataGridContext, useDataGridRowContext } from '../../hooks';
import { Slot } from '../../../Slot';

export interface DataGridCellProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Column index of the cell (0-based). Used together with row index from the row context
   * to form grid coordinates: `[row, col]`.
   */
  col?: number;
  
  /**
   * External ref to the cell root element. Will be merged with the internal
   * `itemRef([row, col], key)` registration when the cell is not excluded.
   */
  ref?: Ref<HTMLDivElement>;
  
  /**
   * Stable key that identifies the cell in the DataGrid matrix.
   * If omitted, a key is derived as `${row}:${col}` from row/col.
   */
  cellKey?: string | number;
  
  /**
   * When `true`, renders children via `Slot` and forwards props/refs to the child
   * element instead of using a native `<div>`.
   *
   * @default false
   */
  asChild?: boolean;
}

/**
 * DataGridCell registers itself in the DataGrid matrix, exposes ARIA roles/attributes,
 * and manages focusability based on the grid’s active cell.
 */
export const DataGridCell: FC<PropsWithChildren<DataGridCellProps>> = ({
  children,
  asChild,
  ref,
  col,
  className,
  cellKey,
  ...props
}) => {
  const Element = asChild ? Slot : 'div'
  
  const { itemRef, active, excluded } = useDataGridContext()
  const { row } = useDataGridRowContext()
  
  const key = cellKey ?? `${row}:${col}`
  const coordinates = row !== undefined && col !== undefined
    ? [row, col] as [number, number]
    : undefined
  const focusable = key === active
  
  return (
    <Element
      role='gridcell'
      data-row={row}
      data-col={col}
      data-key={cellKey}
      tabIndex={focusable ? 0 : -1}
      ref={mergeRefs([ref, coordinates && !excluded?.(key) ? itemRef(coordinates, key) : undefined])}
      className={csx(style.cell, className)}
      {...props}
    >
      {children}
    </Element>
  )
}