import { FC, ReactNode, useMemo } from 'react';
import { createCalendarDateFormatter } from '@vega-ui/i18n';
import { createMonthPickerGrid } from '../../helpers';
import { MonthPickerRowGroup, type MonthPickerRowGroupProps } from '../MonthPickerRowGroup';
import { MonthPickerRow } from '../MonthPickerRow';
import { MonthPickerCellProvider, useMonthPickerContext } from '../../contexts';

export interface MonthPickerLayoutProps extends MonthPickerRowGroupProps {
  /**
   * Template of a month cell, rendered once for every month of the year.
   * Read the month with `useMonthPickerCellContext()`; usually `<MonthPickerCell />`.
   */
  children: ReactNode;
  
  /**
   * Number of columns; rows are added as needed for all months of the year.
   * @default 3
   */
  cols?: number;
  
  /**
   * Locale used for formatting month names.
   * Defaults to the locale of the picker.
   */
  locale?: string;
  
  /**
   * Month display format (from `Intl.DateTimeFormatOptions`).
   * @default "long"
   */
  format?: Intl.DateTimeFormatOptions['month'];
}

/**
 * MonthPickerLayout renders all months of the MonthPicker's year in its
 * calendar system, with locale-aware month names.
 */
export const MonthPickerLayout: FC<MonthPickerLayoutProps> = ({
  cols = 3,
  locale: _locale,
  format = 'long',
  children,
  ...props
}) => {
  const { year, calendar, locale: contextLocale } = useMonthPickerContext()
  const locale = _locale ?? contextLocale
  const formatMonth = useMemo(() => createCalendarDateFormatter(calendar, locale, { month: format }), [locale, format, calendar])
  
  return (
    <MonthPickerRowGroup {...props}>
      {createMonthPickerGrid({ year, calendar, cols }).map(({ row, data }) => (
        <MonthPickerRow row={row} key={row}>
          {data.map(({ col, month }) => (
            <MonthPickerCellProvider
              key={month}
              col={col}
              date={month}
              fields={calendar.toFields(month)}
              label={formatMonth(month)}
            >
              {children}
            </MonthPickerCellProvider>
          ))}
        </MonthPickerRow>
      ))}
    </MonthPickerRowGroup>
  )
}
