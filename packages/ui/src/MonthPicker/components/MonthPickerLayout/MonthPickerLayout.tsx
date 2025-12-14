import { FC } from 'react';
import { createMonthPickerGrid } from '../../helpers';
import { MonthPickerItem } from '../MonthPickerItem';
import { MonthPickerRowGroup, type MonthPickerRowGroupProps } from '../MonthPickerRowGroup';
import { MonthPickerRow } from '../MonthPickerRow';
import { formatMonth } from '@vega-ui/utils';

export interface MonthPickerLayoutProps extends MonthPickerRowGroupProps {
  /**
   * Number of grid rows.
   * Determines vertical density of rendered months.
   *
   * @default 4
   */
  rows?: number;
  
  /**
   * Number of grid columns.
   * Determines horizontal density of rendered months.
   *
   * @default 3
   */
  cols?: number;
  
  /**
   * Starting month index (0 = January).
   * Defines the first month rendered in the matrix.
   *
   * @default 0
   */
  start?: number;
  
  /**
   * Locale used to format month names via Intl.DateTimeFormat.
   * Can be a single locale or a fallback list.
   *
   * @default navigator.language
   */
  locale?: Intl.LocalesArgument;
  
  /**
   * Formatting style for month labels.
   * Mirrors the `month` option of Intl.DateTimeFormat.
   * Common values: `"long"`, `"short"`, `"narrow"`.
   *
   * @default "long"
   */
  format?: Intl.DateTimeFormatOptions['month'];
}

/**
 * MonthPickerLayout is a composable grid layout for rendering
 * month-selection views inside MonthPicker. It generates a matrix
 * of months using `createMonthPickerGrid` and renders them through
 * MonthPickerRowGroup → MonthPickerRow → MonthPickerItem.
 *
 * The layout is fully declarative and can be customized through:
 * - grid dimensions (`rows`, `cols`)
 * - starting month offset (`start`)
 * - localized month formatting (`locale`, `format`)
 *
 * This component is often used as the default layout inside <MonthPicker>,
 * but can also serve as a base for fully custom month UIs.
 */
export const MonthPickerLayout: FC<MonthPickerLayoutProps> = ({
  start = 0,
  rows = 4,
  cols = 3,
  locale = navigator.language,
  format = 'long',
  ...props
}) => {
  return (
    <MonthPickerRowGroup {...props}>
      {createMonthPickerGrid({ start, rows, cols }).map(({ row, data }) => (
        <MonthPickerRow row={row} key={row}>
          {data.map(({ col, month }) => (
            <MonthPickerItem col={col} value={month} key={month}>
              {formatMonth(month, locale, format)}
            </MonthPickerItem>
          ))}
        </MonthPickerRow>
      ))}
    </MonthPickerRowGroup>
  )
}