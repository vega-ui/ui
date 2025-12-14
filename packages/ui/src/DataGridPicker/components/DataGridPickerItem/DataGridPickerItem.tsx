import { FC, PropsWithChildren } from 'react';
import { DataGridCellKey, useDataGridRowContext } from '../../../DataGrid';
import { csx } from '@vega-ui/utils';
import style from './style.module.css';
import { DataGridPickerItemRangePosition } from './types.ts';
import { getRangePosition } from './helpers';
import { DataGridSelectableCell, DataGridSelectableCellProps } from '../../../DataGridSelectable';
import { useDataGridSelectableContext } from '../../../DataGridSelectable';
import { DataGridPickerSize, DataGridPickerVariant } from '../../types.ts';
import { useDataGridPickerContext } from '../../contexts';

export interface DataGridPickerItemProps extends Omit<DataGridSelectableCellProps, 'cellKey'> {
  /**
   * Optional visual indicator of the cell’s position within a range.
   * One of: `"start" | "between" | "end"`.
   * If not provided, the component automatically derives it based on selection context.
   */
  range?: DataGridPickerItemRangePosition
  
  /**
   * Controls the item’s visual size.
   * Useful for adapting the picker to compact or large layouts.
   */
  size?: DataGridPickerSize
  
  /**
   * Logical value associated with this grid cell.
   * Used as the cell’s unique selection key.
   */
  value?: DataGridCellKey
  
  /**
   * Visual appearance preset for the picker.
   */
  variant?: DataGridPickerVariant
}

/**
 * A selectable cell within a DataGridPicker that can reflect its
 * position in a selected range for visual feedback.
 */
export const DataGridPickerItem: FC<PropsWithChildren<DataGridPickerItemProps>> = ({
  col,
  size,
  range,
  className,
  children,
  value,
  variant,
  ...props
}) => {
  const { row } = useDataGridRowContext()
  const { size: _size, variant: _variant } = useDataGridPickerContext()
  const { equals, selected, selection, compare, isSelected } = useDataGridSelectableContext()

  const key = value ?? `${row}:${col}`
  const rangePosition = selection === 'range' && isSelected(key) && Array.isArray(selected) && selected.length >= 2 && !equals(selected[0], selected[selected.length - 1])
    ? getRangePosition(key, { equals, selected, compare })
    : undefined
  
  return (
    <DataGridSelectableCell
      data-size={size ?? _size}
      data-variant={variant ?? _variant}
      data-range={range ?? rangePosition}
      className={csx(style.pickerItem, className)}
      col={col}
      cellKey={key}
      {...props}
    >
      {children}
    </DataGridSelectableCell>
  )
}