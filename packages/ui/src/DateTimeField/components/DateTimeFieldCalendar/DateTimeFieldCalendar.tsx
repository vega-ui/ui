import { FC } from 'react';
import { Calendar, CalendarProps } from '../../../Calendar';
import { useDateTimeFieldContext } from '../../contexts';
import { maskitoStringifyDateTime } from '@maskito/kit';
import { dispatchEvents, setValue as setNativeValue } from '@vega-ui/utils';

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
 */
export const DateTimeFieldCalendar: FC<DateTimeFieldCalendarProps> = ({ onChange: _onChange, ...props }) => {
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
  
  const onChange = (value: Date) => {
    _onChange?.(value)
    
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
      to={max}
      from={min}
      value={date}
      date={date}
      defaultDate={date}
      onChange={onChange}
      onChangeDate={onChange}
      disabled={disabledDates}
      defaultActiveDay={date?.getTime()}
      {...props}
    />
  )
}