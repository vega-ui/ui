import { FC } from 'react';
import { DataGridSelectableRowGroup, DataGridSelectableRowGroupProps } from '../../../DataGridSelectable';

export type DataGridPickerRowGroupProps = DataGridSelectableRowGroupProps

/**
 * DataGridPickerRowGroup is a structural wrapper component used inside DataGridPicker
 */
export const DataGridPickerRowGroup: FC<DataGridPickerRowGroupProps> = (props) => {
  return <DataGridSelectableRowGroup {...props} />
}