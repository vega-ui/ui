import { FC, useCallback } from 'react';
import { DataGridResolveValue } from '../DataGrid';
import { DataGridCellKey } from '../DataGrid/types.ts';
import { Grid } from '@vega-ui/utils';
import { DataGridSelectable, DataGridSelectableProps } from '../DataGridSelectable';

export type DataGridPickerProps = DataGridSelectableProps

/**
 * DataGridPicker is a higher-level component built on top of DataGridSelectable that allows users to pick or highlight elements (cells) within a selectable grid
 */
export const DataGridPicker: FC<DataGridPickerProps> = ({ wrap = 'horizontal', children, resolveRange, ...props }) => {
  const rangeResolver = useCallback((start: DataGridResolveValue, end: DataGridResolveValue, grid: Grid<HTMLElement, DataGridCellKey>) => {
    if (resolveRange) return resolveRange?.(start, end, grid)

    const [rs, cs] = start.index;
    const [re, ce] = end.index;
    
    const out: DataGridCellKey[] = [];
    for (let r = rs; r <= re; r++) {
      const row = grid.getRow(r)
      if (!row) continue

      if (r === rs) {
        const end = rs === re ? ce : row.lastColumnIndex()
        for (let c = cs; c <= end; c++) {
          const node = row.get(c)
          if (node && node.key !== undefined) out.push(node.key)
        }
        
        continue
      }
      
      for (const cell of row) {
        if (r === re && cell.index[1] > ce) break
        if (cell.key !== undefined) out.push(cell.key)
      }
    }
    return out;
  }, [resolveRange])
  
  return (
    <DataGridSelectable
      wrap={wrap}
      resolveRange={rangeResolver}
      {...props}
    >
      {children}
    </DataGridSelectable>
  )
}