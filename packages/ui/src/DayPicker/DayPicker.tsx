import { PropsWithChildren, Ref, useCallback, useImperativeHandle, useState } from 'react';
import { createInput } from '@vega-ui/core';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput, useWidget, useSnapshot, widgetEnvironment } from '../internals/widget';
import { csx } from '@vega-ui/utils';
import { CalendarSystem, getCalendarMonthStart, getFirstDayOfWeek, gregorianCalendar } from '@vega-ui/i18n';
import { GridKeys, GridItemSize, GridItemVariant, GridProps, GridApiRef, GridSelection } from '../Grid';
import { eraseKey, GridProvider } from '../Grid/contexts'
import { FOCUS, GridEntry } from '@vega-ui/widgets/grid';
import style from './style.module.css';
import { Slot } from '../Slot';
import { createPeriodPicker, dayRules, PeriodValue, SHOW } from '@vega-ui/widgets/dates'
import { useToday } from '../internals/calendar';
import { DayPickerProvider } from './contexts';

export interface DayPickerProps<S extends GridSelection = 'single'> extends Omit<GridProps<string, S>, 'active' | 'defaultActive' | 'onChangeActive' | 'apiRef' | 'disabled'> {
  /**
   * Ref to the grid’s imperative API, with `YYYY-MM-DD` keys.
   * - `focus(date?)` — moves focus to the day of this date, or to the tab stop without one; a day that is not rendered yet takes focus as soon as it renders
   */
  apiRef?: Ref<GridApiRef<string>>

  /**
   * Controlled focused day as a `YYYY-MM-DD` string. The picker shows its month,
   * and the day is the tab stop of the grid when it can be focused.
   */
  focusedDate?: string

  /**
   * Initial focused day for uncontrolled usage.
   * Defaults to the first selected day, otherwise to `today`.
   */
  defaultFocusedDate?: string

  /**
   * Fires with the newly focused day when the focus moves, also to another month.
   */
  onChangeFocusedDate?(date: string): void

  /**
   * Moves the focus to the tab stop of the grid when the picker mounts, like
   * `autofocus` of a native control.
   */
  autoFocus?: boolean

  /**
   * Today as a `YYYY-MM-DD` string: the day marked with `aria-current="date"`.
   * Defaults to the date of the device, read after hydration, so the server
   * and the client render the same markup, and follows the device when the
   * day or the time zone changes.
   */
  today?: string

  /**
   * Calendar system the month grid is built in.
   * Defaults to the Gregorian calendar.
   */
  calendar?: CalendarSystem

  /**
   * BCP 47 locale of the labels and of the first day of the week, e.g. `de-DE`.
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
 * DayPicker is a high-level calendar day selection component built on
 * top of Grid. It provides the selection engine, keyboard
 * navigation, focus management, and range behavior, while leaving the
 * visual layout fully customizable through composition.
 *
 * Cells are keyed by `YYYY-MM-DD` strings, so `value`, `min`, `max`,
 * `disabledDates` and `focusedDate` are ISO days in any calendar system.
 *
 * The picker shows the month of the focused day. Keyboard navigation follows
 * the WAI-ARIA date picker pattern and crosses months: arrows move by a day or
 * a week, Home / End to the first or last day of the week, PageUp / PageDown
 * to the same day of the previous or next month, and Shift + PageUp / PageDown
 * to the same day of the previous or next year.
 *
 * The tab stop is the focused day; without one it is the selected day,
 * otherwise today, otherwise the first available day of the month.
 */
export const DayPicker = <S extends GridSelection = 'single'>({
  children,
  size = 'xs',
  variant = 'secondary',
  selection = 'single' as S,
  calendar = gregorianCalendar,
  locale = 'en-US',
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
}: PropsWithChildren<DayPickerProps<S>>) => {
  const today = useToday(_today)
  const [widget] = useState(() => createPeriodPicker(dayRules))

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
    weekStartsOn: getFirstDayOfWeek(locale),
    today,
    autoFocus,
  }), widgetEnvironment)

  useImperativeHandle(apiRef, () => ({ focus: (date?: string) => void handle.send(createInput(FOCUS, { key: date })) }), [handle])

  const focused = useSnapshot(handle, widget.focusedOf)
  const month = focused === undefined ? undefined : getCalendarMonthStart(calendar, focused)
  const origin = useSnapshot(handle, widget.originOf)
  const anchor = origin === undefined ? undefined : getCalendarMonthStart(calendar, origin)

  const show = useCallback((date: string, page: HTMLElement) => void handle.send(createInput(SHOW, { key: date, keys: handle.elements.within(page) })), [handle])

  const Element = asChild ? Slot : 'div'
  const attrs = useOutput(handle, widget.output.root)
  const rootRef = useMergeRefs([handle.root, ref])

  return (
    <DayPickerProvider size={size} variant={variant} month={month} anchor={anchor} calendar={calendar} locale={locale} today={today} show={show}>
      <GridProvider {...eraseKey({ handle, grid: widget })}>
        <Element ref={rootRef} className={csx(style.grid, className)} {...handle.listen(attrs, props)}>
          {children}
        </Element>
      </GridProvider>
    </DayPickerProvider>
  )
}
