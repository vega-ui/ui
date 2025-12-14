import { DataGridCellKey } from '../DataGrid';

export type DataGridSelection = 'single' | 'multiple' | 'range'
export type DataGridDisabledResolver<K = DataGridCellKey> = (key: K) => boolean
export type DataGridDisabled<K = DataGridCellKey> = DataGridDisabledResolver<K> | K[] | K