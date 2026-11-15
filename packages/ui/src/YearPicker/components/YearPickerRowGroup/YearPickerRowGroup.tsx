import { FC } from 'react';
import { GridRowGroup, GridRowGroupProps } from '../../../Grid';

export type YearPickerRowGroupProps = GridRowGroupProps

/**
 * YearPickerRowGroup is a semantic wrapper around GridRowGroup
 * that groups YearPickerRow components into a structured year grid.
 * It provides no additional logic, but helps organize and compose
 * custom YearPicker layouts.
 */
export const YearPickerRowGroup: FC<YearPickerRowGroupProps> = (props) => {
  return (
    <GridRowGroup {...props} />
  )
}