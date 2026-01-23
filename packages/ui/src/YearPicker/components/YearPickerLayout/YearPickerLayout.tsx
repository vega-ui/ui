import { FC } from 'react';
import { createYearPickerGrid, getIndexByYear } from '../../helpers';
import { YearPickerItem } from '../YearPickerItem';
import { YearPickerRowGroup, YearPickerRowGroupProps } from '../YearPickerRowGroup';
import { YearPickerRow } from '../YearPickerRow';
import { formatYear } from '@vega-ui/utils';
import { useYearPickerContext } from '../../contexts';

export interface YearPickerLayoutProps extends YearPickerRowGroupProps {
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
   * Starting year for the grid’s base calculation.
   * If omitted, the helper falls back to its internal defaults.
   *
   * @default 1970
   */
  start?: number;
  
  /**
   * Logical page offset applied during grid generation.
   * Used together with scroller systems (e.g., IndexedSnapScroller)
   * to shift the displayed decade or page of years.
   *
   * @default 0
   */
  offset?: number;
  
  /**
   * Locales passed to Intl.DateTimeFormat when rendering year labels.
   * Allows adapting the year format to the user’s locale or a custom
   * locale list (e.g., `"en"`, `"ru-RU"`, `["fr", "en-GB"]`).
   *
   * @default browser locale
   */
  locale?: Intl.LocalesArgument;
  
  /**
   * Formatting style for the displayed year.
   * Mirrors the `year` option of Intl.DateTimeFormat — e.g. `"numeric"`
   * or `"2-digit"`. Useful for compact or locale-specific year output.
   *
   * @default "numeric"
   */
  format?: Intl.DateTimeFormatOptions['year'];
}

/**
 * YearPickerLayout is a ready-to-use grid layout for rendering a block
 * of years inside the YearPicker. It builds a structured matrix using
 * `createYearPickerGrid` and renders rows and cells through the semantic
 * YearPickerRow/YearPickerItem primitives.
 *
 * The component is fully layout-driven: it does not manage selection or
 * scrolling logic. It simply generates a year grid based on the provided
 * dimensions (rows × cols), starting year, and offset, making it suitable
 * both for static pickers and for paged scroller setups.
 */
export const YearPickerLayout: FC<YearPickerLayoutProps> = ({
  start = 2000,
  rows = 4,
  cols = 3,
  offset,
  locale = navigator.language,
  format = 'numeric',
  ...props
}) => {
  const { year } = useYearPickerContext()
  const offsetByYear = getIndexByYear(start, year, rows * cols)
  
  return (
    <YearPickerRowGroup {...props}>
      {createYearPickerGrid({ start, rows, cols, offset: offset ?? offsetByYear }).map(({ row, data }) => (
        <YearPickerRow row={row} key={row}>
          {data.map(({ col, year }) => (
            <YearPickerItem col={col} value={year} key={year}>
              {formatYear(year, locale, format)}
            </YearPickerItem>
          ))}
        </YearPickerRow>
      ))}
    </YearPickerRowGroup>
  )
}