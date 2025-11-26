import { DataGridCellKey } from '../../../../DataGrid';
import { DataGridPickerItemRangePosition } from '../types.ts';

export interface GetRangePositionOptions {
  selected: DataGridCellKey | DataGridCellKey[] | undefined
  equals: (a: DataGridCellKey, b: DataGridCellKey) => boolean
  compare: (a: DataGridCellKey, b: DataGridCellKey) => -1 | 0 | 1
}

export const getRangePosition = (key: DataGridCellKey | undefined, options: GetRangePositionOptions): DataGridPickerItemRangePosition | undefined => {
  if (!key) return
  const { selected, equals, compare } = options
  
  if (!selected || !Array.isArray(selected) || !equals) return
  
  let first = selected[0]
  let last = selected[selected.length - 1]
  
  if (compare(first, last) > 0) [first, last] = [last, first]
  
  if (equals(first, key)) return 'start'
  if (equals(last, key)) return 'end'
  
  return 'between'
}