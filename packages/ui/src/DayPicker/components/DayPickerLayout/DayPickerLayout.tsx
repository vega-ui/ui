import { FC, ReactNode, useMemo } from 'react';
import { createDayPickerGrid } from '../../helpers';
import { DayPickerRowGroup, type DayPickerRowGroupProps } from '../DayPickerRowGroup';
import { DayPickerRow } from '../DayPickerRow';

import { createCalendarDayFormatter, getFirstDayOfWeek } from '@vega-ui/i18n';
import { DayPickerCellProvider, useDayPickerContext } from '../../contexts';

export interface DayPickerLayoutProps extends DayPickerRowGroupProps {
  /**
   * Template of a day cell, rendered once for every day of the grid.
   * Read the day with `useDayPickerCellContext()`; usually `<DayPickerCell />`.
   */
  children: ReactNode;
  
  /**
   * Number of grid rows (typically 5 or 6 depending on the month).
   * @default 6
   */
  rows?: number;
  
  /**
   * Month to render, given as a `YYYY-MM-DD` string of any day in it.
   * Defaults to the month of the parent DayPicker.
   */
  month?: string;
  
  /**
   * Page index used to keep row indexes unique when several months
   * are rendered side by side (e.g., by a scroller).
   * @default 0
   */
  offset?: number;
  
  /**
   * Whether to render days from previous and next months
   * to fill the full grid. If false, overflow cells are empty/disabled.
   * @default false
   */
  includeOverflowDays?: boolean;
  
  /**
   * Locale used for formatting the day label.
   * Defaults to the locale of the picker.
   */
  locale?: string;
  
  /**
   * Display format of the day (Intl.DateTimeFormat).
   * Example: "numeric", "2-digit".
   * @default "numeric"
   */
  format?: Intl.DateTimeFormatOptions['day'];
  
  /**
   * Defines the first day of the week.
   * 0 = Sunday, 1 = Monday, … 6 = Saturday.
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * DayPickerLayout is the default grid renderer for DayPicker.
 *
 * It generates a complete month view in the DayPicker's calendar system
 * using `createDayPickerGrid`, handling overflow days and locale-aware day
 * formatting.
 *
 * Its children are the template of a day cell, rendered once per day inside
 * the cell context (`useDayPickerCellContext`), usually `<DayPickerCell />`.
 * Cells sit in a Row and RowGroup structure, so focus,
 * keyboard navigation, selection and disabled cells work as in DataGridPicker.
 */
export const DayPickerLayout: FC<DayPickerLayoutProps> = ({
  month,
  locale: _locale,
  format = 'numeric',
  rows = 6,
  offset = 0,
  includeOverflowDays = false,
  weekStartsOn,
  children,
  ...props
}) => {
  const { month: contextMonth, calendar, locale: contextLocale } = useDayPickerContext()
  const locale = _locale ?? contextLocale
  const formatDay = useMemo(() => createCalendarDayFormatter(calendar, locale, format), [locale, format, calendar])

  const grid = createDayPickerGrid({
    month: month ?? contextMonth,
    calendar,
    rows,
    offset,
    includeOverflowDays,
    weekStartsOn: weekStartsOn ?? getFirstDayOfWeek(locale)
  })
  
  return (
    <DayPickerRowGroup {...props}>
      {grid.map(({ row, data }) => (
        <DayPickerRow row={row} key={row}>
          {data.map(({ col, date, inCurrentMonth }) => (
            <DayPickerCellProvider
              key={col}
              col={col}
              date={date}
              fields={date === undefined ? undefined : calendar.toFields(date)}
              label={date === undefined ? '' : formatDay(date)}
              inMonth={inCurrentMonth}
            >
              {children}
            </DayPickerCellProvider>
          ))}
        </DayPickerRow>
      ))}
    </DayPickerRowGroup>
  )
}
