import { useItem, useOutput } from '../../internals/widget';
import { useGridContext } from '../contexts';
import { useGridRowContext } from '../contexts';
import { GridKey } from '../types';
import { getCellKey } from '../helpers';

interface UseGridCellOptions {
  value?: GridKey
  col: number
  excluded?: boolean
  disabled?: boolean
  selectable: boolean
  interactive?: boolean
}

export const useGridCell = ({ value, col, excluded = false, disabled = false, selectable, interactive = false }: UseGridCellOptions) => {
  const { handle, grid } = useGridContext()
  const { row } = useGridRowContext()

  const key = value ?? getCellKey(row, col)
  const ref = useItem(handle, key, { row, col, excluded, disabled, selectable, interactive })
  const attrs = useOutput(handle, grid.output.cell, key)

  return {
    ref,
    props: { ...attrs, 'data-row': row, 'data-col': col, 'data-key': key },
  }
}
