import { FC } from 'react';
import { DataGridPickerRowGroup, DataGridPickerRowGroupProps } from '../../../DataGridPicker';

export type YearPickerRowGroupProps = DataGridPickerRowGroupProps

/**
 * YearPickerRowGroup is a semantic wrapper around DataGridPickerRowGroup
 * that groups YearPickerRow components into a structured year grid.
 * It provides no additional logic, but helps organize and compose
 * custom YearPicker layouts.
 */
export const YearPickerRowGroup: FC<YearPickerRowGroupProps> = (props) => {
  return (
    <DataGridPickerRowGroup {...props} />
  )
}