import { FC } from 'react';
import { Calendar, CalendarProps } from '../../../Calendar';
import { useDateFieldContext } from '../../contexts';
import { maskitoStringifyDate } from '@maskito/kit';
import { dispatchEvents, setValue as setNativeValue, formatISODate, parseISODate } from '@vega-ui/utils';

export type DateFieldCalendarProps = CalendarProps

/**
 * DateFieldCalendar — Calendar adapter for DateField.
 *
 * Reads current value and constraints from DateFieldContext and writes the
 * selected date back into the underlying text input by setting the native
 * input value and dispatching input/change events.
 *
 * Follows the WAI-ARIA date picker pattern: navigating months and years only
 * moves focus, and the input changes only when a day is picked.
 */
export const DateFieldCalendar: FC<DateFieldCalendarProps> = ({ onChangeValue: _onChangeValue, ...props }) => {
  const {
    max,
    min,
    inputRef,
    format,
    separator,
    date,
    disabledDates,
    changeDate,
    lastStringified
  } = useDateFieldContext()

  const onChangeValue = (iso: string) => {
    _onChangeValue?.(iso)

    const value = parseISODate(iso)
    if (!value) return

    const input = inputRef?.current
    if (!input) return

    const stringified = maskitoStringifyDate(value, { mode: format, separator, min, max });
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
