import { FC } from 'react';
import { useTextFieldContext } from '../../../TextField/contexts';
import { useSnapshot } from '../../../internals/widget';
import { Calendar, CalendarProps, CalendarSize } from '../../../Calendar';
import { usePopoverContext } from '../../../Popover';
import { useDateFieldContext } from '../../contexts';
import { createInput } from '@vega-ui/core';
import { PICK_VALUE } from '@vega-ui/widgets/date-field';

export interface DateFieldCalendarProps extends Omit<CalendarProps, 'size'> {
  /**
   * Size of the buttons, cells and weekday names of the calendar.
   * @default the size of the field
   */
  size?: CalendarSize
}

/**
 * DateFieldCalendar — Calendar adapter for DateField, the dialog of the
 * WAI-ARIA date picker dialog pattern.
 *
 * It is a `role="dialog"` named by the user with `aria-label` or
 * `aria-labelledby`. Inside an open `Popover` it moves the focus to the
 * selected date, otherwise today, otherwise the first available date, and
 * shows the month of that date.
 *
 * Picking a day writes it into the input like a native date picker,
 * dispatching `input` and `change`, closes the popover and returns the
 * focus to the trigger. Navigating months and years only moves the focus.
 * A read-only field or input keeps its date.
 */
export const DateFieldCalendar: FC<DateFieldCalendarProps> = ({ onChangeValue: _onChangeValue, ...props }) => {
  const { size } = useTextFieldContext()
  const { handle, max, min, calendar, locale, today, disabledDates, readOnly } = useDateFieldContext()
  const date = useSnapshot(handle, (state) => state.value)
  const popover = usePopoverContext()
  const open = useSnapshot(popover.handle, (state) => state.open)

  const onChangeValue = (iso: string) => {
    if (handle.send(createInput(PICK_VALUE, { to: iso })).answer !== 'handled') return

    popover.close()

    _onChangeValue?.(iso)
  }

  return (
    <Calendar
      role='dialog'
      compact
      size={size}
      autoFocus={open}
      readOnly={readOnly}
      max={max}
      min={min}
      value={date}
      today={today}
      calendar={calendar}
      locale={locale}
      onChangeValue={onChangeValue}
      disabledDates={disabledDates}
      {...props}
    />
  )
}
