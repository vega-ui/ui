import { FC } from 'react';
import { GridRowGroup, GridRowGroupProps } from '../../../Grid';

export type DayPickerRowGroupProps = GridRowGroupProps

/**
 * DayPickerRowGroup is a semantic wrapper around GridRowGroup,
 * grouping multiple DayPickerRow components into a structured calendar
 * grid section.
 *
 * It introduces no additional logic — all focus traversal, keyboard
 * navigation, and selection behavior remain fully delegated to the
 * underlying GridRowGroup.
 */
export const DayPickerRowGroup: FC<DayPickerRowGroupProps> = (props) => {
  return <GridRowGroup {...props} />
}