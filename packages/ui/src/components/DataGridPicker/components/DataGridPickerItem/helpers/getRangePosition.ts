import { DataGridCellKey } from '../../../../DataGrid/types';
import { DataGridPickerItemRangePosition } from '../types.ts';

export interface GetRangePositionOptions {
  selected: DataGridCellKey | DataGridCellKey[] | undefined
  equals: (a: DataGridCellKey, b: DataGridCellKey) => boolean
}

export const getRangePosition = (key: DataGridCellKey, options: GetRangePositionOptions): DataGridPickerItemRangePosition | undefined => {
  const { selected, equals } = options
  
  if (!selected || !Array.isArray(selected) || !equals) return
  
  const first = selected[0]
  const last = selected[selected.length - 1]
  
  if (equals(first, key)) return 'start'
  if (equals(last, key)) return 'end'
  
  return 'between'
}