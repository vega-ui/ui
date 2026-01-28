import { FC, KeyboardEvent, MouseEvent } from 'react';
import { DataGridCell, DataGridCellProps, useDataGridRowContext } from '../../../DataGrid';
import { useDataGridSelectableContext } from '../../contexts';
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import style from './style.module.css'

export interface DataGridSelectableCellProps extends DataGridCellProps {
  /**
   * Disables click and keyboard selection.
   * Overrides value from root DataGrid
   * */
  disabled?: boolean;
}

/**
 * DataGridSelectableCell — a selectable grid cell.
 * */
export const DataGridSelectableCell: FC<DataGridSelectableCellProps> = ({
  col,
  disabled: _disabled,
  cellKey,
  className,
  onClick: _onClick,
  onKeyDown: _onKeyDown,
  ...props
}) => {
  const { row } = useDataGridRowContext()
  const { onSelect, isSelected, isDisabled } = useDataGridSelectableContext()

  const key = cellKey ?? `${row}:${col}`
  const disabled = _disabled || isDisabled(key)

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (key === undefined || disabled) return
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect?.(key)
    }
  }
  
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (key === undefined || disabled) return
    
    e.preventDefault()
    onSelect?.(key)
  }
  
  return (
    <DataGridCell
      {...props}
      aria-selected={isSelected(key)}
      className={csx(style.cell, className)}
      onClick={mergeEventHandlers(_onClick, onClick)}
      onKeyDown={mergeEventHandlers(_onKeyDown, onKeyDown)}
      aria-disabled={disabled}
      cellKey={key}
      col={col}
    />
  )
}