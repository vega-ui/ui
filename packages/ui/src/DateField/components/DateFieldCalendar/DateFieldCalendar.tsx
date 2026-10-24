import { FC } from 'react';
import { Calendar, CalendarProps } from '../../../Calendar';
import { useDateFieldContext } from '../../contexts';
import { dispatchEvents, setValue as setNativeValue, formatTemplateDate } from '@vega-ui/utils';

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
    template,
    calendar,
    locale,
    date,
    disabledDates,
    changeDate
  } = useDateFieldContext()

  const onChangeValue = (iso: string) => {
    _onChangeValue?.(iso)

    if (!iso) return

    const input = inputRef?.current
    if (!input) return

    const stringified = formatTemplateDate(calendar, iso, template);
    changeDate(iso)

    setNativeValue(input, stringified)
    dispatchEvents(input)
  }

  return (
    <Calendar
      compact
      max={max}
      min={min}
      value={date ?? ''}
      calendar={calendar}
      locale={locale}
      onChangeValue={onChangeValue}
      disabledDates={disabledDates}
      {...props}
    />
  )
}
