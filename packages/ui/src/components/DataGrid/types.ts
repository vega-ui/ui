import { Grid } from '@vega-ui/utils';

export type DataGridWrap = 'horizontal' | 'vertical' | 'both'
export type DataGridCellKey = string | number;

export interface DataGridApiRef<K> {
  grid: Grid<HTMLElement, K>
  keyMap: Map<K, DataGridCoordinates>
}

export type DataGridCoordinates = [number, number];
export type DataGridResolveValue<K> = { index: DataGridCoordinates, key: K }
export type DataGridExcludeResolver<K> = ((key: K) => boolean)
export type DataGridExclude<K> = DataGridExcludeResolver<K> | K[] | K
