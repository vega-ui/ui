import { PropsWithChildren } from 'react';
import { CalendarSystem, getCalendarMonthStart, getCalendarYearEnd, getCalendarYearStart, getDefaultLocale, gregorianCalendar } from '@vega-ui/i18n';
import { findISODateInRange, formatISODate, getCurrentDate } from '@vega-ui/utils';
import { DataGridPicker, DataGridPickerProps } from '../DataGridPicker';
import { type DataGridSelection } from '../DataGridSelectable';
import { MonthPickerProvider } from './contexts';

export interface MonthPickerProps<S extends DataGridSelection = 'single'> extends DataGridPickerProps<string, S> {
  /**
   * Year whose months are shown, given as a `YYYY-MM-DD` string of any day in it.
   * Defaults to the current year.
   */
  year?: string

  /**
   * Calendar system the months belong to — it defines how many months a year has.
   * Defaults to the Gregorian calendar.
   */
  calendar?: CalendarSystem

  /**
   * BCP 47 locale of the month names, e.g. `de-DE`.
   * Defaults to the locale of the runtime, like `Intl`.
   */
  locale?: string
}

/**
 * MonthPicker is a thin wrapper around DataGridPicker specialized for
 * selecting months. Cells are keyed by the first day of each month as a
 * `YYYY-MM-DD` string, so a year can have any number of months.
 *
 * It applies a default size of `"xs"`. Without `defaultActive`, the initial
 * active month (the tab stop) is the current month when it is in the visible
 * year, otherwise the first selected month in it, otherwise its first month.
 *
 * Custom month layouts can be composed by passing children, allowing
 * full control over how months are rendered within the grid.
 */
export const MonthPicker = <S extends DataGridSelection = 'single'>({
  children,
  defaultActive,
  year,
  calendar = gregorianCalendar,
  locale = getDefaultLocale(),
  size = 'xs',
  ...props
}: PropsWithChildren<MonthPickerProps<S>>) => {
  const today = formatISODate(getCurrentDate())
  const visibleYear = getCalendarYearStart(calendar, year || today)
  const selected = [props.selected ?? props.defaultSelected].flat()
  const currentMonth = getCalendarMonthStart(calendar, today)
  const yearEnd = getCalendarYearEnd(calendar, visibleYear)
  const active = findISODateInRange([currentMonth, ...selected], visibleYear, yearEnd) ?? visibleYear

  return (
    <MonthPickerProvider year={visibleYear} calendar={calendar} locale={locale}>
      <DataGridPicker {...props} size={size} defaultActive={defaultActive ?? active}>
        {children}
      </DataGridPicker>
    </MonthPickerProvider>
  )
}
