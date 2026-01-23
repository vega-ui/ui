import { FC } from 'react';
import { DataGridPickerItem, DataGridPickerItemProps } from '../../../DataGridPicker';

export type YearPickerItemProps = DataGridPickerItemProps

/**
 * YearPickerItem is an interactive cell representing a single year
 * within the YearPicker grid. It participates in the full selection
 * system (single / multiple / range), reflects active and disabled
 * states, and integrates with DataGrid navigation.
 *
 * Used inside YearPickerRow / YearPickerLayout to build custom
 * year-selection interfaces. The visual appearance adapts to the
 * picker’s size and variant settings.
 */
export const YearPickerItem: FC<YearPickerItemProps> = (props) => {
  return <DataGridPickerItem {...props} />
}