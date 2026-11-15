import { HTMLAttributes, useId, useMemo, useState } from 'react';
import { createInput } from '@vega-ui/core';
import { useEventCallback } from '@vega-ui/hooks';
import { useSnapshot, useWidget, widgetEnvironment } from '../internals/widget';
import { parseISODate, sanitizeISODates, createKeyMatcher, csx } from '@vega-ui/utils';
import { CalendarSystem, getCalendarMonthStart, getCalendarYearStart, gregorianCalendar } from '@vega-ui/i18n';
import { DayPickerProps } from '../DayPicker';
import { MonthPickerProps } from '../MonthPicker';
import { YearPickerProps } from '../YearPicker';
import { PeriodValue } from '@vega-ui/widgets/dates'
import { useToday } from '../internals/calendar';
import { CalendarPartsProvider, CalendarProvider, CalendarStateProvider } from './contexts';
import { CalendarDatesDisabled, CalendarView, CalendarSelection, CalendarValue, CalendarSize, CalendarVariant } from './types';
import { CLOSE_VIEW, createCalendar, DAYS, FOCUS_DATE, FOCUS_YEAR, NEXT, PICK, PREVIOUS, TOGGLE_VIEW } from '@vega-ui/widgets/calendar';
import style from './style.module.css';

export interface CalendarProps<S extends CalendarSelection = 'single'> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /**
   * Visual variant of the buttons and cells of the calendar.
   * @default "secondary"
   */
  variant?: CalendarVariant;

  /**
   * Size of the buttons, cells and weekday names of the calendar.
   * @default "xs"
   */
  size?: CalendarSize;

  /**
   * Shrinks the calendar to the width of its content: the root gets
   * `data-compact="true"`.
   */
  compact?: boolean;

  /**
   * Latest selectable date as a `YYYY-MM-DD` string.
   * - Months and years beyond this date become unavailable.
   * - Day, Month, and Year pickers use this to disable or clamp navigation.
   */
  max?: string;

  /**
   * Earliest selectable date as a `YYYY-MM-DD` string.
   * - Months and years before this date become unavailable.
   * - All pickers respect this constraint when computing active ranges.
   */
  min?: string;

  /**
   * Selection mode.
   * Determines the structure of `value`, all dates are `YYYY-MM-DD` strings:
   * - 'single'   — a string, `''` when nothing is selected
   * - 'multiple' — an array of strings
   * - 'range'    — a `[start, end]` tuple with `start` not after `end`, `''` marks an unset bound
   *
   * @default 'single'
   */
  selection?: S;

  /**
   * Controlled visible view:
   * - 'day' — the days of the visible month (`CalendarDays`)
   * - 'month' — the months of the visible year (`CalendarMonths`)
   * - 'year' — pages of years (`CalendarYears`)
   */
  view?: CalendarView;

  /**
   * Controlled selection value, shaped by the `selection` mode.
   * Malformed or non-existent dates are treated as unselected.
   */
  value?: CalendarValue<S>;

  /**
   * Uncontrolled initial selection value, shaped by the `selection` mode.
   */
  defaultValue?: CalendarValue<S>;

  /**
   * Initial view for uncontrolled usage.
   *
   * @default 'day'
   */
  defaultView?: CalendarView;

  /**
   * Disables the whole calendar: no date can be selected and navigation is off.
   */
  disabled?: boolean;

  /**
   * Makes the selection read-only like a native `readonly` input: the day grid
   * gets `aria-readonly="true"`, navigation still works, and picking a day
   * neither changes the selection nor calls `onChangeValue`.
   */
  readOnly?: boolean;

  /**
   * Moves the focus into the calendar when it mounts, onto the tab stop of
   * the shown view: the focused day, otherwise the selected day or today,
   * otherwise the first available day.
   */
  autoFocus?: boolean;

  /**
   * Dates that cannot be selected, as `YYYY-MM-DD` strings:
   * - a single date
   * - an array of dates
   * - a predicate `(date: string) => boolean`
   */
  disabledDates?: CalendarDatesDisabled;

  /**
   * Fires when the user changes the selection.
   * The value is shaped by the `selection` mode.
   */
  onChangeValue?(value: CalendarValue<S>): void;

  /**
   * Fires when the visible view changes.
   */
  onChangeView?(view: CalendarView): void;

  /**
   * Controlled focused day as a `YYYY-MM-DD` string. The calendar shows its
   * month, and the day is the tab stop of the day grid when it can be focused.
   */
  focusedDate?: string;

  /**
   * Initial focused day for uncontrolled usage.
   *
   * Default: the selected day, otherwise `today` clamped to `min` and `max`
   */
  defaultFocusedDate?: string;

  /**
   * Fires with the newly focused day as a `YYYY-MM-DD` string when the focus
   * moves, also to another month (with the keyboard, the previous and next
   * buttons, swiping, or the month and year views).
   * This event represents navigation, not selection.
   */
  onChangeFocusedDate?(date: string): void;

  /**
   * Today as a `YYYY-MM-DD` string: the day marked with `aria-current="date"`.
   * Defaults to the date of the device, read after hydration, so the server
   * and the client render the same markup. Pass it when the server must
   * render the month of today, or to use the time zone of the user. Without
   * it, today follows the device when the day or the time zone changes.
   */
  today?: string;

  /**
   * Calendar system the calendar is shown in. Values stay `YYYY-MM-DD` days.
   * Defaults to the Gregorian calendar.
   */
  calendar?: CalendarSystem;

  /**
   * BCP 47 locale of month and day names and of the first day of the week,
   * e.g. `de-DE`. Applies to all parts of the calendar and sets `lang` on the root.
   * @default "en-US"
   */
  locale?: string;
}

const isDate = (date: unknown): date is string => typeof date === 'string' && date !== ''

const ALWAYS_DISABLED = () => true

/**
 * `Calendar` is the high-level, fully featured calendar component. It
 * coordinates day, month, and year views and manages controlled/uncontrolled
 * selection state for single, multiple, and range selection modes. The days
 * stay mounted to keep the size; the months and the years are mounted while
 * their view is open and until its exit transition ends.
 *
 * All dates in its API are `YYYY-MM-DD` strings, like native date inputs.
 * The calendar shows the month of the focused day, so navigation of any kind
 * is a change of the focused day. Months, years and their names follow the
 * `calendar` system, so the same API works with any calendar of the world.
 *
 * Keyboard focus starts on the focused day; without one on the selected day,
 * otherwise on today, otherwise on the first available day of the month.
 */
export const Calendar = <S extends CalendarSelection = 'single'>({
  max,
  min,
  value,
  view: _view,
  disabled,
  readOnly,
  autoFocus,
  disabledDates,
  size = 'xs',
  defaultValue,
  focusedDate,
  defaultFocusedDate,
  onChangeFocusedDate,
  today: _today,
  calendar = gregorianCalendar,
  locale: _locale,
  variant = 'secondary',
  compact,
  className,
  selection = 'single' as S,
  defaultView = 'day',
  onChangeView,
  onChangeValue,
  children,
  ...props
}: CalendarProps<S>) => {
  const locale = _locale ?? 'en-US'
  const today = useToday(_today)
  const headingId = useId()

  const from = parseISODate(min) ? min : undefined
  const to = parseISODate(max) ? max : undefined

  const isDisabled = useMemo(() => (disabled ? ALWAYS_DISABLED : createKeyMatcher(disabledDates)), [disabled, disabledDates])

  const selected = useMemo(() => [sanitizeISODates(value ?? defaultValue)].flat().filter(isDate), [value, defaultValue])

  const [widget] = useState(createCalendar)

  const handle = useWidget(widget, {
    calendar,
    today,
    min: from,
    max: to,
    isDisabled,
    selected,
    autoFocus,
    disabled: disabled ?? false,
    yearsPerPage: 12,
    view: _view,
    defaultView,
    onChangeView,
    focusedDate: parseISODate(focusedDate) ? focusedDate : undefined,
    defaultFocusedDate: parseISODate(defaultFocusedDate) ? defaultFocusedDate : undefined,
    onChangeFocusedDate: (date: string | undefined) => {
      if (date !== undefined) onChangeFocusedDate?.(date)
    },
  }, widgetEnvironment)

  const view = useSnapshot(handle, (state) => state.view)
  const focused = useSnapshot(handle, widget.focusedOf)
  const focusedYear = useSnapshot(handle, widget.focusedYearOf)
  const requested = useSnapshot(handle, widget.requestedOf)
  const month = focused === undefined ? undefined : getCalendarMonthStart(calendar, focused)

  const onSelectDay = useEventCallback((day: PeriodValue) => {
    if (!Array.isArray(day) || selection !== 'range') {
      onChangeValue?.(day as CalendarValue<S>)
      return
    }

    const [start = '', end = ''] = day
    onChangeValue?.([start, end] as CalendarValue<S>)
  })

  const changeFocusedDate = useEventCallback((date: string) => void handle.send(createInput(FOCUS_DATE, { value: date })))
  const pick = useEventCallback((date: string) => void handle.send(createInput(PICK, { value: date })))
  const focusYear = useEventCallback((date: string) => void handle.send(createInput(FOCUS_YEAR, { value: date })))
  const toggleView = useEventCallback((next: Exclude<CalendarView, 'day'>) => void handle.send(createInput(TOGGLE_VIEW, { value: next })))
  const closeView = useEventCallback(() => void handle.send(createInput(CLOSE_VIEW)))

  const prev = useEventCallback(() => void handle.send(createInput(PREVIOUS)))
  const next = useEventCallback(() => void handle.send(createInput(NEXT)))

  const days: DayPickerProps<CalendarSelection> = {
    ref: handle.part(DAYS),
    focusedDate: focused,
    onChangeFocusedDate: changeFocusedDate,
    autoFocus: autoFocus && requested === 'day',
    today,
    calendar,
    locale,
    selection,
    readOnly,
    value: sanitizeISODates(value) as CalendarValue<CalendarSelection> | undefined,
    defaultValue: sanitizeISODates(defaultValue) as CalendarValue<CalendarSelection> | undefined,
    onChangeValue: onSelectDay as (value: CalendarValue<CalendarSelection>) => void,
    min: from,
    max: to,
    disabledDates: isDisabled,
    size,
    variant,
  }

  const months: MonthPickerProps = {
    defaultFocusedDate: month,
    today,
    calendar,
    locale,
    min: from && getCalendarMonthStart(calendar, from),
    max: to && getCalendarMonthStart(calendar, to),
    value: month,
    disabledDates: disabled ? ALWAYS_DISABLED : undefined,
    onChangeValue: pick,
    autoFocus: requested === 'month',
    size,
    variant,
  }

  const years: YearPickerProps = {
    focusedDate: focusedYear,
    onChangeFocusedDate: focusYear,
    today,
    calendar,
    locale,
    value: month && getCalendarYearStart(calendar, month),
    min: from && getCalendarYearStart(calendar, from),
    max: to && getCalendarYearStart(calendar, to),
    disabledDates: disabled ? isDisabled : undefined,
    onChangeValue: pick,
    autoFocus: requested === 'year',
    size,
    variant,
  }

  return (
    <CalendarProvider
      disabled={disabled}
      readOnly={readOnly}
      today={today}
      calendar={calendar}
      locale={locale}
      selection={selection}
      size={size}
      variant={variant}
      view={view}
      headingId={headingId}
      handle={handle}
      widget={widget}
      prev={prev}
      next={next}
      closeView={closeView}
      toggleView={toggleView}
      changeFocusedDate={changeFocusedDate}
    >
      <CalendarPartsProvider days={days} months={months} years={years}>
        <CalendarStateProvider month={month}>
          <div
            ref={handle.root}
            className={csx(style.calendar, className)}
            data-compact={compact}
            aria-disabled={disabled || undefined}
            data-disabled={disabled || undefined}
            lang={_locale}
            {...handle.listen({}, props)}
          >
            {children}
          </div>
        </CalendarStateProvider>
      </CalendarPartsProvider>
    </CalendarProvider>
  )
}
