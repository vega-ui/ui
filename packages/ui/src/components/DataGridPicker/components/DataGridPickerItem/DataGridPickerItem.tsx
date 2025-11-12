import { FC, PropsWithChildren, useRef } from 'react';
import { useDataGridRowContext } from '../../../DataGrid';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';
import { DataGridPickerItemRangePosition } from './types';
import { getRangePosition } from './helpers';
import { DataGridSelectableCell, DataGridSelectableCellProps } from '../../../DataGridSelectable';
import { useDataGridSelectableContext } from '../../../DataGridSelectable';

export interface DataGridPickerItemProps extends DataGridSelectableCellProps {
  /**
   * Optional visual indicator of the cell’s position within a range.
   * One of: `"start" | "between" | "end"`.
   * If not provided, the component automatically derives it based on selection context.
   */
  range?: DataGridPickerItemRangePosition
}

/**
 * A selectable cell within a DataGridPicker that can reflect its
 * position in a selected range for visual feedback.
 */
export const DataGridPickerItem: FC<PropsWithChildren<DataGridPickerItemProps>> = ({
  range,
  className,
  children,
  cellKey,
  col,
  ...props
}) => {
  const { row } = useDataGridRowContext()
  const { equals, selected, selection } = useDataGridSelectableContext()
  
  const ref = useRef<HTMLDivElement>(null)
  
  const key = cellKey ?? `${row}:${col}`
  const rangePosition = selection === 'range' && Array.isArray(selected) && selected.length >= 2 && !equals(selected[0], selected[selected.length - 1])
    ? getRangePosition(key, { equals, selected })
    : undefined
  
  return (
    <DataGridSelectableCell
      ref={ref}
      data-range={range ?? rangePosition}
      className={csx(style.item, className)}
      col={col}
      cellKey={key}
      {...props}
    >
      {children}
    </DataGridSelectableCell>
  )
}