import { PropsWithChildren } from 'react';
import { DataGridPicker, DataGridPickerProps } from '../DataGridPicker';
import { type DataGridSelection } from '../DataGridSelectable';

export type YearPickerProps<S extends DataGridSelection = 'single'> = DataGridPickerProps<number, S>

/**
 * A composable year–selection module built on top of DataGridPicker.
 * Provides grid primitives, a decade-scrolling wrapper, ready-to-use
 * layouts, and APIs for generating custom pages. Supports single,
 * multiple, and range selection, as well as min/max boundaries.
 *
 * Layouts can be fully customized by composing primitive components
 * (Row, RowGroup, Item, Scroller, ScrollerContent), or you can use the
 * built-in YearPickerLayout for a ready-made structure.
 */
export const YearPicker = <S extends DataGridSelection = 'single'>({ children, defaultActive, size = 'xs', ...props }: PropsWithChildren<YearPickerProps<S>>) => {
  return (
    <DataGridPicker {...props} size={size} defaultActive={defaultActive ?? new Date().getFullYear()}>
      {children}
    </DataGridPicker>
  )
}