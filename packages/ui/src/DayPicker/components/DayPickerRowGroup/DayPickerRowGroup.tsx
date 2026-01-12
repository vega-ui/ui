import { FC } from 'react';
import { DataGridPickerRowGroup, DataGridPickerRowGroupProps } from '../../../DataGridPicker';

export type DayPickerRowGroupProps = DataGridPickerRowGroupProps

/**
 * DayPickerRowGroup is a semantic wrapper around DataGridPickerRowGroup,
 * grouping multiple DayPickerRow components into a structured calendar
 * grid section.
 *
 * It introduces no additional logic — all focus traversal, keyboard
 * navigation, and selection behavior remain fully delegated to the
 * underlying DataGridPickerRowGroup.
 */
export const DayPickerRowGroup: FC<DayPickerRowGroupProps> = (props) => {
  return <DataGridPickerRowGroup {...props} />
}