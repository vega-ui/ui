import { FC, HTMLAttributes, PropsWithChildren, Ref, useLayoutEffect } from 'react';
import style from './style.module.css'
import { csx, mergeEventHandlers, mergeRefs } from '@vega-ui/utils';
import { useDataGridContext, useDataGridRowContext, useDataGridRowGroupContext } from '../../contexts';
import { Slot } from '../../../Slot';
import { DataGridCellKey } from '../../types';

export interface DataGridCellProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Column index of the cell (0-based). Used together with row index from the row context
   * to form grid coordinates: `[row, col]`.
   */
  col: number;
  
  /**
   * External ref to the cell root element. Will be merged with the internal
   * `itemRef([row, col], key)` registration when the cell is not excluded.
   */
  ref?: Ref<HTMLDivElement>;
  
  /**
   * Stable key that identifies the cell in the DataGrid matrix.
   * If omitted, a key is derived as `${row}:${col}` from row/col.
   */
  cellKey?: DataGridCellKey;
  
  /**
   * When `true`, renders children via `Slot` and forwards props/refs to the child
   * element instead of using a native `<div>`.
   *
   * @default false
   */
  asChild?: boolean;
  
  /**
   * Exclude cells from focus traversal.
   * Overrides value from root DataGrid
   */
  excluded?: boolean;
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
  excluded,
  cellKey,
  onFocus: _onFocus,
  ...props
}) => {
  const Element = asChild ? Slot : 'div'
  
  const { setItemRef, removeItemRef, changeActive, active, excluded: _excluded } = useDataGridContext()
  const { scope } = useDataGridRowGroupContext()
  const { row } = useDataGridRowContext()
  
  const key = cellKey ?? `${row}:${col}`
  const focusable = key === active
  const excludedCell = excluded || _excluded(key)
  
  useLayoutEffect(() => {
    return () => {
      removeItemRef([row, col], key, scope)
    }
  }, [row, col, key, scope, removeItemRef]);
  
  const onFocus = () => {
    changeActive(key)
  }
  
  return (
    <Element
      role='gridcell'
      data-row={row}
      data-col={col}
      data-key={cellKey}
      onFocus={mergeEventHandlers(_onFocus, onFocus)}
      tabIndex={focusable ? 0 : -1}
      ref={mergeRefs([ref, excludedCell ? undefined : setItemRef([row, col], key, scope)])}
      className={csx(style.cell, className)}
      {...props}
    >
      {children}
    </Element>
  )
}