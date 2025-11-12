import { DataGridCellKey } from '../DataGrid/types.ts';

export type DataGridSelection = 'single' | 'multiple' | 'range'
export type DataGridDisabledResolver = (key: DataGridCellKey) => boolean
export type DataGridDisabled = DataGridDisabledResolver | DataGridCellKey[] | DataGridCellKey