import { FC } from 'react';
import { DataGridPickerRowGroup, DataGridPickerRowGroupProps } from '../../../DataGridPicker';

export type MonthPickerRowGroupProps = DataGridPickerRowGroupProps

/**
 * MonthPickerRowGroup is a semantic wrapper around
 * DataGridPickerRowGroup that groups multiple MonthPickerRow
 * components into a cohesive grid section.
 *
 * It introduces no additional logic or behavior — all keyboard
 * navigation, selection handling, and layout structure are inherited
 * from the underlying DataGridPickerRowGroup.
 *
 * Using this wrapper improves readability and provides clearer intent
 * when composing custom MonthPicker layouts.
 */
export const MonthPickerRowGroup: FC<MonthPickerRowGroupProps> = (props) => {
  return <DataGridPickerRowGroup {...props} />
}