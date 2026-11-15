import { PropsWithChildren, Ref, useImperativeHandle, useState } from 'react';
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
import { createPeriodPicker, monthRules, PeriodValue } from '@vega-ui/widgets/dates'
import { useToday } from '../internals/calendar';
import { MonthPickerProvider } from './contexts';

export interface MonthPickerProps<S extends GridSelection = 'single'> extends Omit<GridProps<string, S>, 'active' | 'defaultActive' | 'onChangeActive' | 'apiRef' | 'disabled'> {
  /**
   * Ref to the grid’s imperative API, with `YYYY-MM-DD` keys.
   * - `focus(date?)` — moves focus to the month of this date, or to the tab stop without one; a month that is not rendered yet takes focus as soon as it renders
   */
  apiRef?: Ref<GridApiRef<string>>

  /**
   * Controlled focused month, given as a `YYYY-MM-DD` string of any day in it.
   * The picker shows the year of this month, and the month is the tab stop of
   * the grid when it can be focused.
   */
  focusedDate?: string

  /**
   * Initial focused month for uncontrolled usage, given as a `YYYY-MM-DD`
   * string of any day in it. Defaults to the first selected month, otherwise
   * to the month of `today`.
   */
  defaultFocusedDate?: string

  /**
   * Fires with the first day of the newly focused month when the focus moves.
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
   * Calendar system the months belong to — it defines how many months a year has.
   * Defaults to the Gregorian calendar.
   */
  calendar?: CalendarSystem

  /**
   * BCP 47 locale of the month names, e.g. `de-DE`.
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
}

/**
 * MonthPicker is a thin wrapper around Grid specialized for
 * selecting months. Cells are keyed by the first day of each month as a
 * `YYYY-MM-DD` string, so a year can have any number of months.
 *
 * It shows the year of the focused month and applies a default size of
 * `"xs"`. The tab stop is the focused month; without one it is the selected
 * month, otherwise the current month, otherwise the first available month of
 * the year.
 *
 * Custom month layouts can be composed by passing children, allowing
 * full control over how months are rendered within the grid.
 */
export const MonthPicker = <S extends GridSelection = 'single'>({
  children,
  calendar = gregorianCalendar,
  locale = 'en-US',
  size = 'xs',
  variant = 'secondary',
  selection = 'single' as S,
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
  asChild,
  className,
  ref,
  ...props
}: PropsWithChildren<MonthPickerProps<S>>) => {
  const today = useToday(_today)
  const [widget] = useState(() => createPeriodPicker(monthRules))

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
  }), widgetEnvironment)

  useImperativeHandle(apiRef, () => ({ focus: (date?: string) => void handle.send(createInput(FOCUS, { key: date })) }), [handle])

  const focused = useSnapshot(handle, widget.focusedOf)
  const year = focused === undefined ? undefined : getCalendarYearStart(calendar, focused)

  const Element = asChild ? Slot : 'div'
  const attrs = useOutput(handle, widget.output.root)
  const rootRef = useMergeRefs([handle.root, ref])

  return (
    <MonthPickerProvider size={size} variant={variant} year={year} calendar={calendar} locale={locale}>
      <GridProvider {...eraseKey({ handle, grid: widget })}>
        <Element ref={rootRef} className={csx(style.grid, className)} {...handle.listen(attrs, props)}>
          {children}
        </Element>
      </GridProvider>
    </MonthPickerProvider>
  )
}
