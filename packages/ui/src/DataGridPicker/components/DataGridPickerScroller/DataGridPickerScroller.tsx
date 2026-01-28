import { FC } from 'react';
import { IndexedSnapScroller, IndexedSnapScrollerProps } from '../../../IndexedSnapScroller';
import { useDataGridContext } from '../../../DataGrid';

export type DataGridPickerScrollerProps = IndexedSnapScrollerProps

/**
 * DataGridPickerScroller integrates IndexedSnapScroller with DataGrid focus management.
 *
 * The component listens to snap index changes and ensures that the DataGrid
 * always has a valid active cell within the newly visible scope.
 *
 * When the snap index changes, it:
 * - resolves the scope associated with the new index
 * - finds the first available (non-excluded) cell within that scope
 * - moves the DataGrid active focus to that cell if the current active
 *   does not belong to the scope
 *
 * This is required for correct keyboard navigation and focus restoration
 * when DataGridPicker is used together with indexed or paginated scrollers.
 *
 * If the active cell already belongs to the current scope, no focus change occurs.
 */
export const DataGridPickerScroller: FC<DataGridPickerScrollerProps> = ({ onScrollSnapChanging: _onScrollSnapChanging, ...props }) => {
  const { scopes, grid, excluded, changeActive, active } = useDataGridContext()
  
  const getFirstScopedKey = (index: number) => {
    const scope = scopes.get(index)
    if (!scope) return;

    const firstKey = scope[0]
    if (firstKey === undefined || scope.includes(active)) return
    
    const first = grid.getNodeByKey(firstKey)
    if (first === undefined) return
    
    const nextActive = excluded(firstKey) ? grid.after(first.index, 0, true)?.key : firstKey
    if (nextActive === undefined || !scope.includes(nextActive)) return
    
    return nextActive
  }
  
  const onScrollSnapChanging = (element: HTMLElement, index: number) => {
    _onScrollSnapChanging?.(element, index)
    
    const first = getFirstScopedKey(index)
    if (first) changeActive(first)
  }
  
  return <IndexedSnapScroller {...props} onScrollSnapChanging={onScrollSnapChanging} />
}