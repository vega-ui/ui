import { useCallback, useRef } from 'react';
import { IndexedSnapScrollerApiRef } from '../IndexedSnapScroller';
import { CalendarProvider } from './contexts';
import { useControlledState } from '@vega-ui/hooks';
import { CalendarDatesDisabled, CalendarPicker, CalendarSelection, CalendarValue } from './types';
import { DataGridApiRef } from '../DataGrid';
import { CalendarBase, CalendarBaseProps } from '../CalendarBase';
import { focusPickerValue, getAvailableDate } from './helpers';
import { getClampedDate, getCurrentDate } from '@vega-ui/utils';

export interface CalendarProps<S extends CalendarSelection = 'single'> extends Omit<CalendarBaseProps, 'onChange' | 'defaultValue'> {
  /**
   * Upper date boundary for navigation and selection.
   * - Months and years beyond this date become unavailable.
   * - Day, Month, and Year pickers use this to disable or clamp navigation.
   */
  to?: Date;
  
  /**
   * Lower date boundary for navigation and selection.
   * - Months and years before this date become unavailable.
   * - All pickers respect this constraint when computing active ranges.
   */
  from?: Date;
  
  /**
   * Selection mode.
   * Determines the structure of the returned `value`:
   * - 'single'   — a single `Date`
   * - 'multiple' — an array of `Date`
   * - 'range'    — a tuple `[start: Date | null, end: Date | null]`
   *
   * Default: `'single'`
   */
  selection?: S;
  
  /**
   * Controls which picker view is currently active.
   * - 'day'   — standard calendar grid
   * - 'month' — month selection view
   * - 'year'  — year selection view
   *
   * When controlled, it overrides the internal picker state.
   */
  picker?: CalendarPicker;
  
  /**
   * Controlled selection value.
   * Shape depends on the `selection` mode:
   * - single:   `Date | undefined`
   * - multiple: `Date[] | undefined`
   * - range:    `[Date | null, Date | null] | undefined`
   */
  value?: CalendarValue<S>;
  
  /**
   * Uncontrolled initial selection value.
   * Shape depends on the `selection` mode:
   * - single:   `Date | undefined`
   * - multiple: `Date[] | undefined`
   * - range:    `[Date | null, Date | null] | undefined`
   */
  defaultValue?: CalendarValue<S>;
  
  /**
   * Uncontrolled initial picker view.
   * Used only on first render when `picker` is not controlled.
   *
   * Default: `'day'`
   */
  defaultPicker?: CalendarPicker;
  
  /**
   * Disables specific dates.
   * Can be:
   * - a single `Date`
   * - an array of `Date`
   * - a predicate `(date: Date) => boolean`
   *
   * Used to gray out or prevent interaction with certain days in the grid.
   */
  disabled?: CalendarDatesDisabled;
  
  /**
   * Fires when the visible date changes (e.g., via scrolling or picker).
   * This event represents *view navigation*, not selection.
   */
  onChangeDate?(date: Date): void;
  
  /**
   * Fires when the selected value changes.
   * The value type depends on the selected mode:
   * - 'single'   → `Date | undefined`
   * - 'multiple' → `Date[]`
   * - 'range'    → `[Date | null, Date | null]`
   */
  onChange?(value: CalendarValue<S>): void;
  
  /**
   * Fires when the active picker view changes.
   * Useful for synchronizing UI (e.g., closing external popovers or
   * updating analytics on mode switches).
   */
  onChangePicker?(picker: CalendarPicker): void;
  
  /**
   * Reference date used as a logical anchor for indexed or virtualized pickers.
   *
   * This does not affect selection directly, but helps stabilize
   * scroll-based navigation.
   */
  referenceDate?: Date;
  
  /**
   * Controlled visible date.
   */
  date?: Date;
  
  /**
   * Initial visible date for uncontrolled usage.
   */
  defaultDate?: Date;
  
  /**
   * Controlled active (focused) day value.
   *
   * Represented as a timestamp for consistency across pickers.
   */
  activeDay?: number;
  
  /**
   * Initial active day for uncontrolled usage.
   */
  defaultActiveDay?: number;
  
  /**
   * Fires when the active day changes due to keyboard or programmatic focus.
   */
  onChangeActiveDay?(activeDay: number | undefined): void;
}

/**
 * `Calendar` is the high-level, fully featured calendar component that
 * composes:
 * - the visual shell from `CalendarBase`, and
 * - all calendar interaction logic via `CalendarContext`.
 *
 * It coordinates day, month, and year views; synchronizes scroll-based
 * navigation with visible dates; and manages controlled/uncontrolled
 * selection state for single, multiple, and range selection modes.
 */
export const Calendar = <S extends CalendarSelection>({
  to,
  from,
  value,
  picker,
  disabled,
  size = 'xs',
  defaultValue,
  referenceDate,
  date: _date,
  defaultDate = getCurrentDate(),
  defaultActiveDay,
  activeDay: _activeDay,
  onChangeActiveDay,
  variant = 'secondary',
  selection = 'single' as S,
  defaultPicker = 'day',
  onChangePicker,
  onChangeDate,
  onChange,
  children,
  ...props
}: CalendarProps<S>) => {
  const reference = referenceDate ?? new Date(1970, 0, 1)
  const currentDate = getCurrentDate()
  
  const [date, setDate] = useControlledState<Date>(_date, defaultDate, onChangeDate)
  const [activePicker, setActivePicker] = useControlledState(picker, defaultPicker, onChangePicker)
  const [activeDay, setActiveDay] = useControlledState(_activeDay, defaultActiveDay ?? currentDate.getTime(), onChangeActiveDay)

  const dayPickerApiRef = useRef<DataGridApiRef<number>>(null)
  const monthPickerApiRef = useRef<DataGridApiRef<number>>(null)
  const yearPickerApiRef = useRef<DataGridApiRef<number>>(null)
  
  const scrollerApiRef = useRef<IndexedSnapScrollerApiRef>(null)
  const yearScrollerApiRef = useRef<IndexedSnapScrollerApiRef>(null)
  
  const getAvailableByDate = (year: number, month: number) => {
    const date = new Date(activeDay).getDate()
    
    const lastDay = new Date(year, month + 1, 0).getDate()
    const candidate = new Date(year, month, Math.min(date, lastDay))
    
    return getAvailableDate(candidate, { from, to, disabled })
  }
  
  const focusAvailable = (year: number, month: number) => {
    const resolved = getAvailableByDate(year, month)
    if (resolved) requestAnimationFrame(() => focusPickerValue(dayPickerApiRef.current, resolved.getTime()))
  }
  
  const openDayPicker = useCallback(() => {
    setActivePicker('day')
  }, [])
  
  const closePicker = useCallback(() => {
    openDayPicker()
    requestAnimationFrame(() => {
      focusPickerValue(dayPickerApiRef.current, activeDay)
    })
  }, [openDayPicker, activeDay])
  
  const changePeriod = (y: number, m: number) => {
    const d = new Date(date)
    d.setFullYear(y)
    d.setMonth(m)
    
    setDate(d)
    
    const resolved = getAvailableByDate(y, m)
    if (!resolved) return
    
    requestAnimationFrame(() => setActiveDay(resolved.getTime()))
  }

  const changeMonth = (value: number) => {
    const d = new Date(date)
    d.setMonth(value)
    
    setDate(d)
    
    openDayPicker()
    focusAvailable(d.getFullYear(), value)
  }
  
  const changeYear = (value: number) => {
    const clamped = getClampedDate(new Date(value, date.getMonth()), from, to)
    const clampedMonth = clamped.getMonth()
    const d = new Date(date)
    
    if (clampedMonth !== date.getMonth()) {
      d.setMonth(clampedMonth)
      setDate(d)
    }
    
    d.setFullYear(value)
    
    setDate(d)
    
    openDayPicker()
    focusAvailable(value, clampedMonth)
  }
  
  const onSelectDay = useCallback((day: number | number[]) => {
    const value = Array.isArray(day) ? day.map(d => new Date(d)) : new Date(day)
    onChange?.(value as CalendarValue<S>)
  }, [])
  
  const toggleMonthPicker = useCallback(() => {
    if (activePicker === 'month') {
      openDayPicker()
      return
    }
    
    setActivePicker('month')
    requestAnimationFrame(() => focusPickerValue(monthPickerApiRef.current, date.getMonth()))
  }, [activePicker, date, openDayPicker])

  const toggleYearPicker = useCallback(() => {
    if (activePicker === 'year') {
      openDayPicker()
      return
    }
    
    setActivePicker('year')
    requestAnimationFrame(() => focusPickerValue(yearPickerApiRef.current, date.getFullYear()))
  }, [activePicker, date, openDayPicker])
  
  const nextPeriod = useCallback(() => scrollerApiRef.current?.next(), [])
  const nextYearGroup = useCallback(() => yearScrollerApiRef.current?.next(), [])
  const prevPeriod = useCallback(() => scrollerApiRef.current?.prev(), [])
  const prevYearGroup = useCallback(() => yearScrollerApiRef.current?.prev(), [])
  
  return (
    <CalendarProvider
      to={to}
      value={value}
      from={from}
      disabled={disabled}
      year={date.getFullYear()}
      month={date.getMonth()}
      nextPeriod={nextPeriod}
      nextYearGroup={nextYearGroup}
      prevPeriod={prevPeriod}
      prevYearGroup={prevYearGroup}
      defaultValue={defaultValue}
      selection={selection}
      activeDay={activeDay}
      picker={activePicker}
      referenceDate={reference}
      changePicker={setActivePicker}
      changeActiveDay={setActiveDay}
      scrollerApiRef={scrollerApiRef}
      scrollerYearApiRef={yearScrollerApiRef}
      dayPickerApiRef={dayPickerApiRef}
      yearPickerApiRef={yearPickerApiRef}
      monthPickerApiRef={monthPickerApiRef}
      closeMonthPicker={closePicker}
      closeYearPicker={closePicker}
      changeYear={changeYear}
      changeMonth={changeMonth}
      changePeriod={changePeriod}
      onSelectDay={onSelectDay}
      toggleMonthPicker={toggleMonthPicker}
      toggleYearPicker={toggleYearPicker}
    >
      <CalendarBase size={size} variant={variant} {...props}>
        {children}
      </CalendarBase>
    </CalendarProvider>
  )
}