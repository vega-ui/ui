import { getCellCoordinates } from './getCellCoordinates.ts';
import { DataGridCellKey } from '../../DataGrid';
import { Grid } from '@vega-ui/utils';

export const getCellKey = <K = DataGridCellKey>(element: HTMLElement, grid: Grid<HTMLElement, K>) => {
  const coordinates = getCellCoordinates(element)
  if (!coordinates) return
  
  const key = grid.getNode(coordinates)?.key
  if (key === undefined) return;
  
  return key
}