import { FC } from 'react';
import { DataGridPickerItem, DataGridPickerItemProps } from '../../../DataGridPicker';

export type MonthPickerItemProps = DataGridPickerItemProps

/**
 * MonthPickerItem is a thin wrapper around DataGridPickerItem,
 * representing a single month cell within a MonthPicker layout.
 *
 * It inherits all interactive and visual behavior from the underlying
 * DataGridPickerItem — including selection states, range highlighting,
 * disabled handling, and size/variant styling.
 *
 * The component does not add any custom logic; it simply provides
 * semantic clarity and consistency when composing MonthPicker layouts.
 */
export const MonthPickerItem: FC<MonthPickerItemProps> = (props) => {
  return <DataGridPickerItem {...props} />
}