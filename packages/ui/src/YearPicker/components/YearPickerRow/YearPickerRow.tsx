import { FC } from 'react';
import { DataGridPickerRow, DataGridPickerRowProps } from '../../../DataGridPicker';

export type YearPickerRowProps = DataGridPickerRowProps

/**
 * YearPickerRow is a thin wrapper around DataGridPickerRow used to
 * structure rows within the YearPicker grid. It provides semantic
 * clarity and keeps year-specific layouts consistent, while delegating
 * all row behavior (navigation, focus, range logic) to the underlying
 * DataGridPickerRow.
 */
export const YearPickerRow: FC<YearPickerRowProps> = (props) => {
  return (
    <DataGridPickerRow {...props} />
  )
}