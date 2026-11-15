import { FC } from 'react';
import { GridRow, GridRowProps } from '../../../Grid';

export type YearPickerRowProps = GridRowProps

/**
 * YearPickerRow is a thin wrapper around GridRow used to
 * structure rows within the YearPicker grid. It provides semantic
 * clarity and keeps year-specific layouts consistent, while delegating
 * all row behavior (navigation, focus, range logic) to the underlying
 * GridRow.
 */
export const YearPickerRow: FC<YearPickerRowProps> = (props) => {
  return (
    <GridRow {...props} />
  )
}