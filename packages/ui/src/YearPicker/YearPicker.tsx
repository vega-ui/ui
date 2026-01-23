import { PropsWithChildren } from 'react';
import { DataGridPicker, DataGridPickerProps } from '../DataGridPicker';
import { type DataGridSelection } from '../DataGridSelectable';
import { YearPickerProvider } from './contexts';
import { getCurrentDate } from '@vega-ui/utils';

export interface YearPickerProps<S extends DataGridSelection = 'single'> extends DataGridPickerProps<number, S> {
  /**
   * Controls the currently visible year.
   *
   * This prop defines **what year is currently in view**, not just which
   * year is selected. Updating it may cause the picker to:
   * - Scroll to the corresponding year grid
   * - Recompute the visible window of years
   * - Update navigation controls (previous / next)
   */
  year?: number
}

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
export const YearPicker = <S extends DataGridSelection = 'single'>({ children, year, defaultActive, size = 'xs', ...props }: PropsWithChildren<YearPickerProps<S>>) => {
  const currentDateYear = getCurrentDate().getFullYear();

  return (
    <YearPickerProvider year={year ?? currentDateYear}>
      <DataGridPicker
        {...props}
        size={size}
        defaultActive={defaultActive ?? currentDateYear}
      >
        {children}
      </DataGridPicker>
    </YearPickerProvider>
  )
}