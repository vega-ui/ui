import { FC, ReactNode, useMemo } from 'react';
import { createCalendarDateFormatter, getCalendarYearsDistance } from '@vega-ui/i18n';
import { createYearPickerGrid } from '../../helpers';
import { YearPickerRowGroup, YearPickerRowGroupProps } from '../YearPickerRowGroup';
import { YearPickerRow } from '../YearPickerRow';
import { YearPickerCellProvider, useYearPickerContext } from '../../contexts';

export interface YearPickerLayoutProps extends YearPickerRowGroupProps {
  /**
   * Template of a year cell, rendered once for every year of the page.
   * Read the year with `useYearPickerCellContext()`; usually `<YearPickerCell />`.
   */
  children: ReactNode;
  
  /**
   * Number of grid rows to render.
   * Controls vertical density of the year matrix.
   *
   * @default 4
   */
  rows?: number;
  
  /**
   * Number of grid columns to render.
   * Controls horizontal density of the year matrix.
   *
   * @default 3
   */
  cols?: number;
  
  /**
   * First year of page `0`, given as a `YYYY-MM-DD` string of any day in it.
   * Pages are aligned to it. Defaults to the first focused year of the YearPicker.
   */
  start?: string;
  
  /**
   * Page index relative to `start`.
   * Defaults to the page containing the focused year of the YearPicker.
   */
  offset?: number;
  
  /**
   * Locale used for formatting years.
   * Defaults to the locale of the picker.
   */
  locale?: string;
  
  /**
   * Year display format (from `Intl.DateTimeFormatOptions`).
   * @default "numeric"
   */
  format?: Intl.DateTimeFormatOptions['year'];
}

/**
 * YearPickerLayout renders a page of consecutive years of the YearPicker's
 * calendar system, with locale-aware year labels.
 */
export const YearPickerLayout: FC<YearPickerLayoutProps> = ({
  start: _start,
  rows = 4,
  cols = 3,
  offset: _offset,
  locale: _locale,
  format = 'numeric',
  children,
  ...props
}) => {
  const { year, anchor, calendar, locale: contextLocale } = useYearPickerContext()
  const locale = _locale ?? contextLocale
  const start = _start ?? anchor

  const pageOffset = start === undefined || year === undefined ? 0 : Math.floor(getCalendarYearsDistance(calendar, start, year) / (rows * cols))
  const offset = _offset ?? pageOffset

  const grid = useMemo(() => {
    if (start === undefined) return []

    const formatYear = createCalendarDateFormatter(calendar, locale, { year: format })

    return createYearPickerGrid({ start, rows, cols, offset, calendar }).map(({ row, data }) => ({
      row,
      data: data.map(({ col, year }) => ({ col, date: year, fields: calendar.toFields(year), label: formatYear(year) })),
    }))
  }, [start, offset, rows, cols, calendar, locale, format])

  return (
    <YearPickerRowGroup {...props}>
      {grid.map(({ row, data }) => (
        <YearPickerRow row={row} key={row}>
          {data.map((cell) => (
            <YearPickerCellProvider key={cell.date} {...cell}>
              {children}
            </YearPickerCellProvider>
          ))}
        </YearPickerRow>
      ))}
    </YearPickerRowGroup>
  )
}
