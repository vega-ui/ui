import { getCellCoordinates } from './getCellCoordinates.ts';
import { Grid } from '@vega-ui/utils';
import { DataGridCellKey } from '../../DataGrid/types.ts';

export const getCellKey = (element: HTMLElement, grid: Grid<HTMLElement, DataGridCellKey>) => {
  const coordinates = getCellCoordinates(element)
  if (!coordinates) return
  
  const key = grid.getNode(coordinates)?.key
  if (key === undefined) return;
  
  return key
}