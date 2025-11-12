import { FC } from 'react';
import { DataGridSelectableRow, DataGridSelectableRowProps } from '../../../DataGridSelectable';

export type DataGridPickerRowProps = DataGridSelectableRowProps

/**
 * DataGridPickerRow represents a single horizontal row inside a DataGridPicker
 */
export const DataGridPickerRow: FC<DataGridPickerRowProps> = (props) => {
  return <DataGridSelectableRow {...props} />
}