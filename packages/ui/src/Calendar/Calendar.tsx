import { useCallback, useRef } from 'react';
import { IndexedSnapScrollerApiRef } from '../IndexedSnapScroller';
import { CalendarProvider } from './contexts';
import { useControlledState } from '@vega-ui/hooks';
import { CalendarDatesDisabled, CalendarPicker, CalendarSelection, CalendarValue } from './types';
import { DataGridApiRef } from '../DataGrid';
import { CalendarBase, CalendarBaseProps } from '../CalendarBase';
import { focusPickerValue, getFirstDayInMonth } from './helpers';
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
   * Fires when the visible year changes (e.g., via scrolling or picker).
   * This event represents *view navigation*, not selection.
   */
  onChangeYear?(year: number): void;
  
  /**
   * Fires when the visible month changes (e.g., via arrow navigation,
   * scrolling, or month picker). The argument is the month index
   * (0–11) of the currently displayed month.
   */
  onChangeMonth?(month: number): void;
  
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
   * Controlled visible year.
   */
  year?: number;
  
  /**
   * Initial visible year for uncontrolled usage.
   */
  defaultYear?: number;
  
  /**
   * Controlled visible month (0–11).
   */
  month?: number;
  
  /**
   * Initial visible month for uncontrolled usage.
   */
  defaultMonth?: number;
  
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
  onChangeActiveDay?(activeDay: number): void;
  
  /**
   * Controlled active month value.
   */
  activeMonth?: number;
  
  /**
   * Initial active month for uncontrolled usage.
   */
  defaultActiveMonth?: number;
  
  /**
   * Fires when the active month changes.
   */
  onChangeActiveMonth?(activeMonth: number): void;
  
  /**
   * Controlled active year value.
   */
  activeYear?: number;
  
  /**
   * Initial active year for uncontrolled usage.
   */
  defaultActiveYear?: number;
  
  /**
   * Fires when the active year changes.
   */
  onChangeActiveYear?(activeYear: number): void;
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
  year: _year,
  month: _month,
  defaultYear,
  defaultMonth,
  defaultActiveDay,
  defaultActiveYear = defaultYear,
  defaultActiveMonth = defaultMonth,
  activeMonth: _activeMonth,
  activeYear: _activeYear,
  activeDay: _activeDay,
  onChangeActiveYear,
  onChangeActiveMonth,
  onChangeActiveDay,
  variant = 'secondary',
  selection = 'single' as S,
  defaultPicker = 'day',
  onChangePicker,
  onChangeMonth,
  onChangeYear,
  onChange,
  children,
  ...props
}: CalendarProps<S>) => {
  const reference = referenceDate ?? new Date(1970, 0, 1)
  const currentDate = getCurrentDate()
  
  const [year, setYear] = useControlledState(_year, defaultYear ?? currentDate.getFullYear(), onChangeYear)
  const [month, setMonth] = useControlledState(_month, defaultMonth ?? currentDate.getMonth(), onChangeMonth)
  
  const [activePicker, setActivePicker] = useControlledState(picker, defaultPicker, onChangePicker)
  
  const [activeDay, setActiveDay] = useControlledState(_activeDay, defaultActiveDay ?? currentDate.getTime(), onChangeActiveDay)
  const [activeMonth, setActiveMonth] = useControlledState(_activeMonth, defaultActiveMonth ?? currentDate.getMonth(), onChangeActiveMonth)
  const [activeYear, setActiveYear] = useControlledState(_activeYear, defaultActiveYear ?? currentDate.getFullYear(), onChangeActiveYear)

  const dayPickerApiRef = useRef<DataGridApiRef<number>>(null)
  const monthPickerApiRef = useRef<DataGridApiRef<number>>(null)
  const yearPickerApiRef = useRef<DataGridApiRef<number>>(null)
  
  const apiRef = useRef<IndexedSnapScrollerApiRef>(null)
  const apiYearRef = useRef<IndexedSnapScrollerApiRef>(null)
  
  const syncActiveDayAndFocus = useCallback((year: number, month: number) => {
    const active = new Date(activeDay)
    if (active.getMonth() === month && active.getFullYear() === year) return
    
    const firstDayTime = getFirstDayInMonth({ year, month, from, to, disabled })?.getTime()
    if (firstDayTime === undefined) return;
    
    requestAnimationFrame(() => focusPickerValue(dayPickerApiRef.current, firstDayTime))
  }, [])
  
  const nextPeriod = useCallback(() => {
    apiRef.current?.next()
  }, [])
  
  const prevPeriod = useCallback(() => {
    apiRef.current?.prev()
  }, [])
  
  const nextYearGroup = useCallback(() => {
    apiYearRef.current?.next()
  }, [])
  
  const prevYearGroup = useCallback(() => {
    apiYearRef.current?.prev()
  }, [])
  
  const openDayPicker = useCallback(() => {
    setActivePicker('day')
  }, [])
  
  const closePicker = useCallback(() => {
    openDayPicker()
    focusPickerValue(dayPickerApiRef.current, activeDay)
  }, [openDayPicker, activeDay])
  
  const changePeriod = useCallback((y: number, m: number) => {
    if (y !== year) setYear(y)
    if (m !== month) setMonth(m)
  }, [year, month])
  
  const changeMonth = useCallback((value: number) => {
    setMonth(value)
    setActiveMonth(value)
    
    openDayPicker()
    
    syncActiveDayAndFocus(year, value)
  }, [openDayPicker, syncActiveDayAndFocus, year])
  
  const changeYear = useCallback((value: number) => {
    const clamped = getClampedDate(new Date(value, month), from, to)
    const clampedMonth = clamped.getMonth()
    
    if (clampedMonth !== month) {
      setMonth(clampedMonth)
      setActiveMonth(clampedMonth)
    }
    
    setYear(value)
    setActiveYear(value)

    openDayPicker()
    
    syncActiveDayAndFocus(value, clampedMonth)
  }, [openDayPicker, syncActiveDayAndFocus, month, from, to])
  
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
    requestAnimationFrame(() => focusPickerValue(monthPickerApiRef.current, month))
  }, [activePicker, month, openDayPicker])

  const toggleYearPicker = useCallback(() => {
    if (activePicker === 'year') {
      openDayPicker()
      return
    }
    
    setActivePicker('year')
    requestAnimationFrame(() => focusPickerValue(yearPickerApiRef.current, year))
  }, [activePicker, year, openDayPicker])
  
  return (
    <CalendarProvider
      from={from}
      to={to}
      year={year}
      month={month}
      nextPeriod={nextPeriod}
      nextYearGroup={nextYearGroup}
      prevPeriod={prevPeriod}
      prevYearGroup={prevYearGroup}
      value={value}
      defaultValue={defaultValue}
      selection={selection}
      activeDay={activeDay}
      picker={activePicker}
      activeYear={activeYear}
      referenceDate={reference}
      activeMonth={activeMonth}
      changePicker={setActivePicker}
      changeActiveDay={setActiveDay}
      changeActiveYear={setActiveYear}
      changeActiveMonth={setActiveMonth}
      scrollerApiRef={apiRef}
      scrollerYearApiRef={apiYearRef}
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