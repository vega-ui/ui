import { FC } from 'react';
import { GridRow, GridRowProps } from '../../../Grid';

export type MonthPickerRowProps = GridRowProps

/**
 * MonthPickerRow is a semantic wrapper around GridRow,
 * representing a single horizontal row of month cells within a
 * MonthPicker layout.
 *
 * The component adds no new logic or styling — it simply provides
 * clearer intent when composing month-based grids, while preserving
 * all focus, keyboard navigation, and selection behaviors of
 * GridRow.
 */
export const MonthPickerRow: FC<MonthPickerRowProps> = (props) => {
  return <GridRow {...props} />
}