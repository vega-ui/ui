import { FC, PropsWithChildren } from 'react';
import { DataGridRowGroup, DataGridRowGroupProps } from '../../../DataGrid';

export type DataGridSelectableRowGroupProps = DataGridRowGroupProps

/**
 * DataGridSelectableRowGroup represents a logical grouping of rows within a DataGridSelectable.
 */
export const DataGridSelectableRowGroup: FC<PropsWithChildren<DataGridSelectableRowGroupProps>> = (props) => {
  return <DataGridRowGroup {...props} />
}