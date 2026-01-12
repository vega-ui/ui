import { FC, PropsWithChildren } from 'react';
import { DataGridRow, DataGridRowProps } from '../../../DataGrid';

export type DataGridSelectableRowProps = DataGridRowProps

/**
 * DataGridSelectableRow groups a set of grid cells under a shared row index
 */
export const DataGridSelectableRow: FC<PropsWithChildren<DataGridSelectableRowProps>> = (props) => {
  return <DataGridRow {...props} />
}