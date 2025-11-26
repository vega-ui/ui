import { FC } from 'react';
import { DataGridPickerRow, DataGridPickerRowProps } from '../../../DataGridPicker';

export type MonthPickerRowProps = DataGridPickerRowProps

/**
 * MonthPickerRow is a semantic wrapper around DataGridPickerRow,
 * representing a single horizontal row of month cells within a
 * MonthPicker layout.
 *
 * The component adds no new logic or styling — it simply provides
 * clearer intent when composing month-based grids, while preserving
 * all focus, keyboard navigation, and selection behaviors of
 * DataGridPickerRow.
 */
export const MonthPickerRow: FC<MonthPickerRowProps> = (props) => {
  return <DataGridPickerRow {...props} />
}