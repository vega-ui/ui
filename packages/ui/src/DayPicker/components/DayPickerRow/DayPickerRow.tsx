import { FC } from 'react';
import { DataGridPickerRow, DataGridPickerRowProps } from '../../../DataGridPicker';

export type DayPickerRowProps = DataGridPickerRowProps

/**
 * DayPickerRow is a semantic wrapper around DataGridPickerRow,
 * used to group day cells into a horizontal row within the DayPicker
 * calendar layout.
 *
 * The component does not add any new logic — all navigation, focus
 * management, and selection behavior are inherited from the underlying
 * DataGridPickerRow.
 *
 * Using this wrapper improves clarity and intent when constructing
 * day-based grids.
 */
export const DayPickerRow: FC<DayPickerRowProps> = (props) => {
  return <DataGridPickerRow {...props} />
}