import { FC } from 'react';
import { GridRowGroup, GridRowGroupProps } from '../../../Grid';

export type MonthPickerRowGroupProps = GridRowGroupProps

/**
 * MonthPickerRowGroup is a semantic wrapper around
 * GridRowGroup that groups multiple MonthPickerRow
 * components into a cohesive grid section.
 *
 * It introduces no additional logic or behavior — all keyboard
 * navigation, selection handling, and layout structure are inherited
 * from the underlying GridRowGroup.
 *
 * Using this wrapper improves readability and provides clearer intent
 * when composing custom MonthPicker layouts.
 */
export const MonthPickerRowGroup: FC<MonthPickerRowGroupProps> = (props) => {
  return <GridRowGroup {...props} />
}