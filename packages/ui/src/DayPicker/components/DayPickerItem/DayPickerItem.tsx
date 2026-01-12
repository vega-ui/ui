import { FC } from 'react';
import { DataGridPickerItem, DataGridPickerItemProps } from '../../../DataGridPicker';

export type DayPickerItemProps = DataGridPickerItemProps

/**
 * DayPickerItem is a semantic wrapper around DataGridPickerItem,
 * representing a single day cell within a DayPicker grid.
 *
 * The component adds no new logic or styling — all selection mechanics,
 * range highlighting, keyboard focus management, and disabled/excluded
 * handling come directly from DataGridPickerItem.
 *
 * Using this wrapper improves readability and conveys intent when
 * composing calendar layouts, while preserving full compatibility with
 * DataGridPicker’s single/multiple/range selection modes.
 */
export const DayPickerItem: FC<DayPickerItemProps> = (props) => {
  return <DataGridPickerItem {...props} />
}