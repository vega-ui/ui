import { PropsWithChildren } from 'react';
import { CalendarSystem, getCalendarYearStart, getDefaultLocale, gregorianCalendar } from '@vega-ui/i18n';
import { formatISODate, getCurrentDate } from '@vega-ui/utils';
import { DataGridPicker, DataGridPickerProps } from '../DataGridPicker';
import { type DataGridSelection } from '../DataGridSelectable';
import { YearPickerProvider } from './contexts';

export interface YearPickerProps<S extends DataGridSelection = 'single'> extends DataGridPickerProps<string, S> {
  /**
   * Controls the currently visible year, given as a `YYYY-MM-DD` string of any day in it.
   *
   * This prop defines **what year is currently in view**, not just which
   * year is selected. Updating it may cause the picker to:
   * - Scroll to the corresponding year grid
   * - Recompute the visible window of years
   * - Update navigation controls (previous / next)
   */
  year?: string

  /**
   * Calendar system the years belong to, including eras.
   * Defaults to the Gregorian calendar.
   */
  calendar?: CalendarSystem

  /**
   * BCP 47 locale of the year labels (and eras), e.g. `ja-JP`.
   * Defaults to the locale of the runtime, like `Intl`.
   */
  locale?: string
}

/**
 * A composable year–selection module built on top of DataGridPicker.
 * Cells are keyed by the first day of each year as a `YYYY-MM-DD` string,
 * so years of any calendar system — including era changes — work the same.
 * Supports single, multiple, and range selection, as well as min/max boundaries.
 *
 * Layouts can be fully customized by composing primitive components
 * (Row, RowGroup, Item, Scroller, ScrollerContent), or you can use the
 * built-in YearPickerLayout for a ready-made structure.
 *
 * Without `defaultActive`, the initial active year (the tab stop) is the
 * visible `year`, which is always on the page in view.
 */
export const YearPicker = <S extends DataGridSelection = 'single'>({
  children,
  year,
  calendar = gregorianCalendar,
  locale = getDefaultLocale(),
  defaultActive,
  size = 'xs',
  ...props
}: PropsWithChildren<YearPickerProps<S>>) => {
  const visibleYear = getCalendarYearStart(calendar, year || formatISODate(getCurrentDate()))

  return (
    <YearPickerProvider year={visibleYear} calendar={calendar} locale={locale}>
      <DataGridPicker
        {...props}
        size={size}
        defaultActive={defaultActive ?? visibleYear}
      >
        {children}
      </DataGridPicker>
    </YearPickerProvider>
  )
}
