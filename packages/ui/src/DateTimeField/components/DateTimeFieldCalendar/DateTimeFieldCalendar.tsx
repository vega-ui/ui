import { FC } from 'react';
import { Calendar, CalendarProps } from '../../../Calendar';
import { useDateTimeFieldContext } from '../../contexts';
import { getISODatePart, formatTemplateDate, normalizeTemplateDate, writeInputValue } from '@vega-ui/utils';

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
    template,
    calendar,
    locale,
    date,
    time,
    disabledDates,
  } = useDateTimeFieldContext()

  const onChangeValue = (iso: string) => {
    _onChangeValue?.(iso)

    if (!iso) return

    const input = inputRef?.current
    if (!input) return

    const formatted = formatTemplateDate(calendar, `${iso}T${time}`, template)
    const stringified = normalizeTemplateDate(calendar, formatted, template, { min, max })

    writeInputValue(input, stringified)
  }

  return (
    <Calendar
      compact
      max={getISODatePart(max)}
      min={getISODatePart(min)}
      value={date ?? ''}
      calendar={calendar}
      locale={locale}
      onChangeValue={onChangeValue}
      disabledDates={disabledDates}
      {...props}
    />
  )
}
