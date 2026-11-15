import { FC } from 'react';
import { useSnapshot } from '../../../internals/widget';
import { Calendar, CalendarProps } from '../../../Calendar';
import { usePopoverContext } from '../../../Popover';
import { useDateTimeFieldContext } from '../../contexts';
import { createInput } from '@vega-ui/core';
import { getISODatePart } from '@vega-ui/utils';
import { PICK_VALUE } from '@vega-ui/widgets/date-time-field';

export type DateTimeFieldCalendarProps = CalendarProps

/**
 * DateTimeFieldCalendar — a calendar picker integrated with a DateTimeField,
 * the dialog of the WAI-ARIA date picker dialog pattern.
 *
 * It is a `role="dialog"` named by the user with `aria-label` or
 * `aria-labelledby`. Inside an open `Popover` it moves the focus to the
 * selected day, otherwise today, otherwise the first available day, and
 * shows the month of that day.
 *
 * Picking a day writes it into the input keeping the typed time (midnight
 * without one), closes the popover and returns the focus to the trigger, so
 * the time is edited in the input. Navigating months and years only moves
 * the focus. A read-only field or input keeps its value.
 */
export const DateTimeFieldCalendar: FC<DateTimeFieldCalendarProps> = ({ onChangeValue: _onChangeValue, ...props }) => {
  const { handle, max, min, calendar, locale, today, disabledDates, readOnly } = useDateTimeFieldContext()
  const dateTime = useSnapshot(handle, (state) => state.value)
  const popover = usePopoverContext()
  const open = useSnapshot(popover.handle, (state) => state.open)

  const onChangeValue = (iso: string) => {
    if (handle.send(createInput(PICK_VALUE, { to: iso })).answer !== 'handled') return

    popover.close()

    _onChangeValue?.(iso)
  }

  const date = getISODatePart(dateTime)

  return (
    <Calendar
      role='dialog'
      compact
      autoFocus={open}
      readOnly={readOnly}
      max={getISODatePart(max)}
      min={getISODatePart(min)}
      value={date ?? ''}
      today={today}
      calendar={calendar}
      locale={locale}
      onChangeValue={onChangeValue}
      disabledDates={disabledDates}
      {...props}
    />
  )
}
