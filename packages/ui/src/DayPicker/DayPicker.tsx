import { PropsWithChildren } from 'react';
import { DataGridPicker, DataGridPickerProps } from '../DataGridPicker';
import { findISODateInRange, formatISODate, getCurrentDate } from '@vega-ui/utils';
import { CalendarSystem, getCalendarMonthEnd, getCalendarMonthStart, getDefaultLocale, gregorianCalendar } from '@vega-ui/i18n';
import { DataGridSelection } from '../DataGridSelectable';
import { DayPickerProvider } from './contexts';

export interface DayPickerProps<S extends DataGridSelection = 'single'> extends DataGridPickerProps<string, S> {
  /**
   * Visible month, given as a `YYYY-MM-DD` string of any day in it.
   * Defaults to the current month.
   */
  month?: string

  /**
   * Calendar system the month grid is built in.
   * Defaults to the Gregorian calendar.
   */
  calendar?: CalendarSystem

  /**
   * BCP 47 locale of the labels and of the first day of the week, e.g. `de-DE`.
   * Defaults to the locale of the runtime, like `Intl`.
   */
  locale?: string
}

/**
 * DayPicker is a high-level calendar day selection component built on
 * top of DataGridPicker. It provides the selection engine, keyboard
 * navigation, focus management, and range behavior, while leaving the
 * visual layout fully customizable through composition.
 *
 * Cells are keyed by `YYYY-MM-DD` strings, so `selected`, `from`, `to`,
 * `disabled` and `active` are ISO days in any calendar system. By default,
 * the active (focused) cell is today, so that keyboard navigation and range
 * selection start from “today.”
 *
 * The component does not define its own layout — you are expected to
 * supply children such as DayPickerLayout, DayPickerRowGroup, or a
 * fully custom grid. All single / multiple / range selection modes,
 * disabled logic, min/max constraints, and picker sizing come directly
 * from DataGridPicker.
 *
 * Without `defaultActive`, the initial active day (the tab stop) is today when
 * it is in the visible month, otherwise the first selected day in it,
 * otherwise its first day.
 */
export const DayPicker = <S extends DataGridSelection = 'single'>({
  children,
  defaultActive,
  size = 'xs',
  month,
  calendar = gregorianCalendar,
  locale = getDefaultLocale(),
  ...props
}: PropsWithChildren<DayPickerProps<S>>) => {
  const today = formatISODate(getCurrentDate())
  const visibleMonth = getCalendarMonthStart(calendar, month || today)
  const selected = [props.selected ?? props.defaultSelected].flat()
  const monthEnd = getCalendarMonthEnd(calendar, visibleMonth)
  const active = findISODateInRange([today, ...selected], visibleMonth, monthEnd) ?? visibleMonth
  
  return (
    <DayPickerProvider month={visibleMonth} calendar={calendar} locale={locale}>
      <DataGridPicker {...props} size={size} defaultActive={defaultActive ?? active}>
        {children}
      </DataGridPicker>
    </DayPickerProvider>
  )
}
