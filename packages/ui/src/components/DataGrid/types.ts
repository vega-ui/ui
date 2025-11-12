import { Grid } from '@vega-ui/utils';

export type DataGridWrap = 'horizontal' | 'vertical' | 'both'

export interface DataGridApiRef {
  grid: Grid<HTMLElement, DataGridCellKey>
  keyMap: Map<DataGridCellKey, DataGridCoordinates>
}

export type DataGridCellKey = string | number;
export type DataGridCoordinates = [number, number];
export type DataGridResolveValue = { index: DataGridCoordinates, key: DataGridCellKey }
export type DataGridExcludeResolver = (key: DataGridCellKey) => boolean
export type DataGridExclude = DataGridExcludeResolver | DataGridCellKey[] | DataGridCellKey
