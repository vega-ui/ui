import { FC } from 'react';
import { createDayPickerGrid } from '../../helpers';
import { DayPickerItem } from '../DayPickerItem';
import { DayPickerRowGroup, type DayPickerRowGroupProps } from '../DayPickerRowGroup';
import { DayPickerRow } from '../DayPickerRow';
import { formatDay, getFirstDayOfWeek } from '@vega-ui/utils';
import { useDayPickerContext } from '../../contexts';

export interface DayPickerLayoutProps extends DayPickerRowGroupProps {
  /**
   * Number of grid rows (typically 5 or 6 depending on the month).
   * @default 6
   */
  rows?: number;
  
  /**
   * Number of columns. Always 7 for a classic week layout.
   * @default 7
   */
  cols?: number;
  
  /**
   * Base year for generating the calendar.
   * Defaults to the current year.
   */
  year?: number;
  
  /**
   * Base month index (0–11) for generating the calendar.
   * Defaults to the current month.
   */
  month?: number;
  
  /**
   * Logical page offset (e.g., used with scrollers to shift between
   * previous/next months without recalculating start month externally).
   * Each offset = +1 means "month + 1".
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
   * Defaults to the browser's current locale.
   */
  locale?: Intl.LocalesArgument;
  
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
 * It generates a complete calendar month view using `createDayPickerGrid`,
 * handling offsets, overflow days, and locale-aware day formatting.
 *
 * Each generated day is rendered as a DayPickerItem inside a Row and
 * RowGroup structure, enabling full integration with DataGridPicker
 * mechanics (focus, keyboard navigation, selection, disabled cells).
 */
export const DayPickerLayout: FC<DayPickerLayoutProps> = ({
  year,
  month,
  locale = navigator.language,
  format = 'numeric',
  rows = 6,
  cols = 7,
  offset = 0,
  includeOverflowDays = false,
  weekStartsOn,
  ...props
}) => {
  const { year: _year, month: _month } = useDayPickerContext()

  const grid = createDayPickerGrid({
    year: year ?? _year,
    month: month ?? _month,
    rows,
    cols,
    offset,
    includeOverflowDays,
    weekStartsOn: weekStartsOn ?? getFirstDayOfWeek(locale as string)
  })
  
  return (
    <DayPickerRowGroup {...props}>
      {grid.map(({ row, data }) => (
        <DayPickerRow row={row} key={row}>
          {data.map(({ col, day, year, month, inCurrentMonth }, index) => (
            <DayPickerItem
              disabled={!inCurrentMonth}
              excluded={!inCurrentMonth}
              col={col}
              value={day !== undefined ? new Date(year, month, day).getTime() : undefined}
              key={index}
            >
              {day !== undefined ? formatDay(day, month, year, locale, format) : undefined}
            </DayPickerItem>
          ))}
        </DayPickerRow>
      ))}
    </DayPickerRowGroup>
  )
}