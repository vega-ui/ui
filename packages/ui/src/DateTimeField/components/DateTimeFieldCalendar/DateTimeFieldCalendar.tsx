import { FC } from 'react';
import { Calendar, CalendarProps } from '../../../Calendar';
import { useDateTimeFieldContext } from '../../contexts';
import { maskitoStringifyDateTime } from '@maskito/kit';
import { dispatchEvents, setValue as setNativeValue, formatISODate, parseISODate } from '@vega-ui/utils';

export type DateTimeFieldCalendarProps = CalendarProps

/**
 * DateTimeFieldCalendar — a calendar picker integrated with a DateTimeField.
 *
 * Purpose:
 * Handles date selection via a calendar UI and synchronizes the selected date
 * with the text input, preserving the current time value.
 *
 * This component acts as the calendar side of the DateTimeField, while the
 * input remains the single source of truth for formatted text.
 *
 * Follows the WAI-ARIA date picker pattern: navigating months and years only
 * moves focus, and the input changes only when a day is picked.
 */
export const DateTimeFieldCalendar: FC<DateTimeFieldCalendarProps> = ({ onChangeValue: _onChangeValue, ...props }) => {
  const {
    max,
    min,
    inputRef,
    dateFormat,
    separator,
    date,
    time,
    disabledDates,
    changeDate,
    timeFormat,
    dateSeparator,
    lastStringified
  } = useDateTimeFieldContext()

  const onChangeValue = (iso: string) => {
    _onChangeValue?.(iso)

    const value = parseISODate(iso)
    if (!value) return

    const [hours, minutes, seconds] = time
      .split(':')
      .map(Number);

    const mergedDate = new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
      hours,
      minutes,
      seconds
    )

    const input = inputRef?.current
    if (!input) return

    const stringified = maskitoStringifyDateTime(mergedDate, {
      dateMode: dateFormat,
      timeMode: timeFormat,
      dateTimeSeparator: separator,
      dateSeparator,
      min,
      max
    });

    lastStringified.current = stringified;

    changeDate(value)

    setNativeValue(input, stringified)
    dispatchEvents(input)
  }

  return (
    <Calendar
      compact
      max={formatISODate(max)}
      min={formatISODate(min)}
      value={formatISODate(date)}
      onChangeValue={onChangeValue}
      disabledDates={disabledDates}
      {...props}
    />
  )
}
