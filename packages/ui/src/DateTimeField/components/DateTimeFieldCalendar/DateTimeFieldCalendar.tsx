import { FC } from 'react';
import { useTextFieldContext } from '../../../TextField/contexts';
import { useSnapshot } from '../../../internals/widget';
import { Calendar, CalendarProps, CalendarSize } from '../../../Calendar';
import { usePopoverContext } from '../../../Popover';
import { useDateTimeFieldContext } from '../../contexts';
import { createInput } from '@vega-ui/core';
import { getISODatePart } from '@vega-ui/utils';
import { PICK_VALUE } from '@vega-ui/widgets/date-time-field';

export interface DateTimeFieldCalendarProps extends Omit<CalendarProps, 'size'> {
  /**
   * Size of the buttons, cells and weekday names of the calendar.
   * @default the size of the field
   */
  size?: CalendarSize
}

/**
 * DateTimeFieldCalendar — a calendar picker integrated with a DateTimeField.
 *
 * Place it in a `PopoverContent` with `role="dialog"` and a name, with a time
 * button under it that opens a `WheelPicker` of `DateTimeFieldColumn` in a
 * nested `Popover`, as on iOS. Inside an open `Popover` it moves
 * the focus to the selected day, otherwise today, otherwise the first
 * available day, and shows the month of that day.
 *
 * Picking a day writes it into the input keeping the time (midnight without
 * one) and keeps the popover open for the time; Escape, a click outside or
 * the trigger closes it. Navigating months and years only moves the focus.
 * A read-only field or input keeps its value.
 */
export const DateTimeFieldCalendar: FC<DateTimeFieldCalendarProps> = ({ onChangeValue: _onChangeValue, ...props }) => {
  const { size } = useTextFieldContext()
  const { handle, max, min, calendar, locale, today, disabledDates, readOnly } = useDateTimeFieldContext()
  const dateTime = useSnapshot(handle, (state) => state.value)
  const popover = usePopoverContext()
  const open = useSnapshot(popover.handle, (state) => state.open)

  const onChangeValue = (iso: string) => {
    if (handle.send(createInput(PICK_VALUE, { to: iso })).answer !== 'handled') return

    _onChangeValue?.(iso)
  }

  const date = getISODatePart(dateTime)

  return (
    <Calendar
      compact
      size={size}
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
