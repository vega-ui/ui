import { FC } from 'react';
import { useTextFieldContext } from '../../../TextField/contexts';
import { useSnapshot } from '../../../internals/widget';
import { Calendar, CalendarProps, CalendarSize } from '../../../Calendar';
import { usePopoverContext } from '../../../Popover';
import { useDateRangeFieldContext } from '../../contexts';
import { createInput } from '@vega-ui/core';
import { PICK_VALUE } from '@vega-ui/widgets/date-range-field';

export interface DateRangeFieldCalendarProps extends Omit<CalendarProps<'range'>, 'size'> {
  /**
   * Size of the buttons, cells and weekday names of the calendar.
   * @default the size of the field
   */
  size?: CalendarSize
}

/**
 * DateRangeFieldCalendar — a range-enabled calendar component integrated
 * with DateRangeField, the dialog of the WAI-ARIA date picker dialog pattern.
 *
 * It is a `role="dialog"` named by the user with `aria-label` or
 * `aria-labelledby`. Inside an open `Popover` it moves the focus to the start
 * of the range, otherwise today, otherwise the first available date, and
 * shows the month of that date.
 *
 * Picking days writes the range into the input like a native date picker,
 * dispatching `input` and `change`. Picking the end of a started
 * range closes the popover and returns the focus to the trigger; moving an
 * edge of a complete range with Shift + arrows or a drag keeps it open.
 * A read-only field or input keeps its range.
 */
export const DateRangeFieldCalendar: FC<DateRangeFieldCalendarProps> = ({ onChangeValue: _onChangeValue, ...props }) => {
  const { size } = useTextFieldContext()
  const { handle, max, min, calendar, locale, today, disabledDates, readOnly } = useDateRangeFieldContext()
  const date = useSnapshot(handle, (state) => state.value)
  const popover = usePopoverContext()
  const open = useSnapshot(popover.handle, (state) => state.open)

  const onChangeValue = (range: [start: string, end: string]) => {
    if (handle.send(createInput(PICK_VALUE, { to: range })).answer !== 'handled') return

    if (date[1] === '' && range[1] !== '') popover.close()

    _onChangeValue?.(range)
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
      selection='range'
      onChangeValue={onChangeValue}
      disabledDates={disabledDates}
      {...props}
    />
  )
}
