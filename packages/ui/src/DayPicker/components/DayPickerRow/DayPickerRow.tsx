import { FC } from 'react';
import { GridRow, GridRowProps } from '../../../Grid';

export type DayPickerRowProps = GridRowProps

/**
 * DayPickerRow is a semantic wrapper around GridRow,
 * used to group day cells into a horizontal row within the DayPicker
 * calendar layout.
 *
 * The component does not add any new logic — all navigation, focus
 * management, and selection behavior are inherited from the underlying
 * GridRow.
 *
 * Using this wrapper improves clarity and intent when constructing
 * day-based grids.
 */
export const DayPickerRow: FC<DayPickerRowProps> = (props) => {
  return <GridRow {...props} />
}