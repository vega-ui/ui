import { PropsWithChildren, Ref, useCallback, useImperativeHandle, useState } from 'react';
import { createInput } from '@vega-ui/core';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput, useWidget, useSnapshot, widgetEnvironment } from '../internals/widget';
import { csx } from '@vega-ui/utils';
import { CalendarSystem, getCalendarYearStart, gregorianCalendar } from '@vega-ui/i18n';
import { GridKeys, GridItemSize, GridItemVariant, GridProps, GridApiRef, type GridSelection } from '../Grid';
import { eraseKey, GridProvider } from '../Grid/contexts'
import { FOCUS, GridEntry } from '@vega-ui/widgets/grid';
import style from './style.module.css';
import { Slot } from '../Slot';
import { createPeriodPicker, PAGES, PeriodValue, SHOW, yearRules } from '@vega-ui/widgets/dates'
import { useToday } from '../internals/calendar';
import { YearPickerProvider } from './contexts';

export interface YearPickerProps<SelectionMode extends GridSelection = 'single'> extends Omit<GridProps<string, SelectionMode>, 'active' | 'defaultActive' | 'onChangeActive' | 'apiRef' | 'disabled'> {
  /**
   * Ref to the grid’s imperative API, with `YYYY-MM-DD` keys.
   * - `focus(date?)` — moves focus to the year of this date, or to the tab stop without one; a year that is not rendered yet takes focus as soon as it renders
   */
  apiRef?: Ref<GridApiRef<string>>

  /**
   * Controlled focused year, given as a `YYYY-MM-DD` string of any day in it.
   * The picker shows the page of this year, and the year is the tab stop of
   * the grid when it can be focused.
   */
  focusedDate?: string

  /**
   * Initial focused year for uncontrolled usage, given as a `YYYY-MM-DD`
   * string of any day in it. Defaults to the first selected year, otherwise
   * to the year of `today`. Pages of years are aligned to it.
   */
  defaultFocusedDate?: string

  /**
   * Fires with the first day of the newly focused year when the focus moves.
   */
  onChangeFocusedDate?(date: string): void

  /**
   * Moves the focus to the tab stop of the grid when the picker mounts, like
   * `autofocus` of a native control.
   */
  autoFocus?: boolean

  /**
   * Today as a `YYYY-MM-DD` string. Defaults to the date of the device, read
   * after hydration, so the server and the client render the same markup, and
   * follows the device when the day or the time zone changes.
   */
  today?: string

  /**
   * Calendar system the years belong to, including eras.
   * Defaults to the Gregorian calendar.
   */
  calendar?: CalendarSystem

  /**
   * BCP 47 locale of the year labels (and eras), e.g. `ja-JP`.
   * @default "en-US"
   */
  locale?: string

  /**
   * Controls the size of the cells.
   *
   * @default 'xs'
   */
  size?: GridItemSize

  /**
   * Color of the selected cells.
   *
   * @default 'secondary'
   */
  variant?: GridItemVariant

  /**
   * Disabled dates, marked with `aria-disabled`: they cannot be selected, and
   * keyboard navigation skips them like the dates outside `min` and `max`.
   * Can be a function `(date) => boolean`, an array of `YYYY-MM-DD` dates, or a single date.
   */
  disabledDates?: GridKeys<string>

  /**
   * Number of years on a page of `YearPickerScroller`; must match the page
   * size of the layout. Inside the scroller PageUp and PageDown move the
   * focus by this many years.
   * @default 12
   */
  period?: number
}

/**
 * A composable year–selection module built on top of Grid.
 * Cells are keyed by the first day of each year as a `YYYY-MM-DD` string,
 * so years of any calendar system — including era changes — work the same.
 * Supports single, multiple, and range selection, as well as min/max boundaries.
 *
 * Layouts can be fully customized by composing primitive components
 * (Row, RowGroup, Item, Scroller, ScrollerContent), or you can use the
 * built-in YearPickerLayout for a ready-made structure.
 *
 * It shows the page of the focused year. The tab stop is the focused year;
 * without one it is the selected year, otherwise the current year, otherwise
 * the first available year.
 */
export const YearPicker = <SelectionMode extends GridSelection = 'single'>({
  children,
  calendar = gregorianCalendar,
  locale = 'en-US',
  size = 'xs',
  variant = 'secondary',
  selection = 'single' as SelectionMode,
  today: _today,
  apiRef,
  cells,
  wrap = 'horizontal',
  exclude,
  getNextKey,
  disabledDates,
  readOnly,
  value,
  defaultValue,
  min,
  max,
  resolveRange,
  compare,
  onChangeValue,
  focusedDate,
  defaultFocusedDate,
  onChangeFocusedDate,
  autoFocus,
  period = 12,
  asChild,
  className,
  ref,
  ...props
}: PropsWithChildren<YearPickerProps<SelectionMode>>) => {
  const today = useToday(_today)
  const [widget] = useState(() => createPeriodPicker(yearRules))

  const handle = useWidget(widget, (entries: readonly GridEntry<string>[]) => ({
    entries,
    cells,
    wrap,
    exclude,
    getNextKey,
    selection,
    disabled: disabledDates,
    readOnly,
    value,
    defaultValue,
    onChangeValue: onChangeValue as ((value: PeriodValue) => void) | undefined,
    min,
    max,
    resolveRange,
    compare,
    focusedDate,
    defaultFocusedDate,
    onChangeFocusedDate: (date: string | undefined) => {
      if (date !== undefined) onChangeFocusedDate?.(date)
    },
    calendar,
    weekStartsOn: 0,
    today,
    autoFocus,
    period,
  }), widgetEnvironment)

  useImperativeHandle(apiRef, () => ({ focus: (date?: string) => void handle.send(createInput(FOCUS, { key: date })) }), [handle])

  const focused = useSnapshot(handle, widget.focusedOf)
  const year = focused === undefined ? undefined : getCalendarYearStart(calendar, focused)

  const origin = useSnapshot(handle, widget.originOf)
  const anchor = origin === undefined ? undefined : getCalendarYearStart(calendar, origin)

  const show = useCallback((date: string, page: HTMLElement) => void handle.send(createInput(SHOW, { key: date, keys: handle.elements.within(page) })), [handle])

  const Element = asChild ? Slot : 'div'
  const attrs = useOutput(handle, widget.output.root)
  const rootRef = useMergeRefs([handle.root, ref])

  return (
    <YearPickerProvider size={size} variant={variant} year={year} anchor={anchor} calendar={calendar} locale={locale} show={show} period={period} pages={handle.part(PAGES)}>
      <GridProvider {...eraseKey({ handle, grid: widget })}>
        <Element ref={rootRef} className={csx(style.grid, className)} {...handle.listen(attrs, props)}>
          {children}
        </Element>
      </GridProvider>
    </YearPickerProvider>
  )
}
