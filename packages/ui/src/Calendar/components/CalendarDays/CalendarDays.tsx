import { FC, HTMLAttributes, KeyboardEvent } from 'react';
import { DayPicker, DayPickerProps } from '../../../DayPicker';
import { type DataGridSelection } from '../../../DataGridSelectable';
import { useCalendarBaseContext } from '../../../CalendarBase';
import { isDisabledDate } from '../../helpers';
import { useCalendarContext } from '../../contexts';
import style from './style.module.css';
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import { addCalendarMonths, addCalendarYears, getCalendarMonthStart } from '@vega-ui/i18n';

export type CalendarDaysProps = HTMLAttributes<HTMLDivElement>

/**
 * `CalendarDays` is the day view of `Calendar`, in the locale and calendar
 * system of the `Calendar`. Place `CalendarWeekdays` and `CalendarWeeks` in it.
 * Its state (month, selection, disabled dates) comes from the `Calendar`.
 *
 * Following the WAI-ARIA date picker pattern, PageUp / PageDown move focus to
 * the same day of the previous / next month, and Shift+PageUp / Shift+PageDown
 * to the same day of the previous / next year.
 */
export const CalendarDays: FC<CalendarDaysProps> = ({
  children,
  onKeyDownCapture: _onKeyDownCapture,
  className,
  ...props
}) => {
  const {
    dayPickerApiRef,
    activeDay,
    onSelectDay,
    changeActiveDay,
    changeMonth,
    defaultValue,
    view,
    value,
    selection,
    from,
    to,
    month,
    calendar,
    locale,
    disabled,
    disabledDates,
  } = useCalendarContext()
  const { size, variant } = useCalendarBaseContext()

  const onKeyDownCapture = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'PageUp' && event.key !== 'PageDown') return

    event.preventDefault()

    const step = event.key === 'PageUp' ? -1 : 1
    let target = event.shiftKey ? addCalendarYears(calendar, month, step) : addCalendarMonths(calendar, month, step)

    if (from && target < getCalendarMonthStart(calendar, from)) target = getCalendarMonthStart(calendar, from)
    if (to && target > to) target = getCalendarMonthStart(calendar, to)

    changeMonth?.(target)
  }

  const isDisabled = (day: string) => Boolean(disabled) || isDisabledDate(day, disabledDates ?? [])

  return (
    <DayPicker<DataGridSelection>
      month={month}
      calendar={calendar}
      locale={locale}
      defaultSelected={defaultValue as DayPickerProps<DataGridSelection>['defaultSelected']}
      disabled={isDisabled}
      apiRef={dayPickerApiRef}
      active={activeDay}
      onChangeActive={changeActiveDay}
      inert={view !== 'day'}
      selected={value as DayPickerProps<DataGridSelection>['selected']}
      variant={variant}
      size={size}
      selection={selection}
      onSelectCell={onSelectDay}
      to={to}
      from={from}
      data-visible={view === 'day'}
      onKeyDownCapture={mergeEventHandlers(onKeyDownCapture, _onKeyDownCapture)}
      className={csx(style.picker, className)}
      {...props}
    >
      {children}
    </DayPicker>
  )
}
