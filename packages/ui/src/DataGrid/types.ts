import { Grid } from '@vega-ui/utils';

export type DataGridWrap = 'horizontal' | 'vertical' | 'both'
export type DataGridCellKey = string | number;
export type DataGridScope = string | number;

export interface DataGridApiRef<K> {
  grid: Grid<HTMLElement, K>
  scopes: Map<DataGridScope, DataGridCellKey[]>
}

export type DataGridCoordinates = [number, number];
export type DataGridResolveValue<K> = { index: DataGridCoordinates, key: K }
export type DataGridExcludeResolver<K> = ((key: K) => boolean)
export type DataGridExclude<K> = DataGridExcludeResolver<K> | K[] | K
