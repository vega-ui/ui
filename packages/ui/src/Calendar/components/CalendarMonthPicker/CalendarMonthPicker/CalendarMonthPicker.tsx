import { FC, KeyboardEvent } from 'react';
import { MonthPicker, MonthPickerProps } from '../../../../MonthPicker';
import { useCalendarContext } from '../../../contexts';
import { useCalendarBaseContext } from '../../../../CalendarBase';
import style from './style.module.css'

export interface CalendarMonthPickerProps extends Omit<MonthPickerProps, 'to' | 'from'> {
  /**
   * Optional callback invoked when the user presses `Escape` while the month
   * picker is active. Allows consumers to react to the close intent before
   * the picker is dismissed by the calendar’s internal logic.
   */
  onClose?(e: KeyboardEvent<HTMLDivElement>): void
}

/**
 * `CalendarMonthPicker` is the calendar-scoped wrapper that integrates the
 * low-level `MonthPicker` component with the high-level calendar
 * state machine. It provides month selection, keyboard handling,
 * constrained navigation, and synchronized UI behavior for the
 * month-selection view inside the `Calendar` component.
 */
export const CalendarMonthPicker: FC<CalendarMonthPickerProps> = ({ onSelectCell, onClose, ...props }) => {
  const {
    from,
    to,
    picker,
    activeMonth,
    year,
    month,
    changeActiveMonth,
    monthPickerApiRef,
    closeMonthPicker,
    onSelectMonth,
  } = useCalendarContext()
  const { size, variant } = useCalendarBaseContext()
  
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose?.(e)
      closeMonthPicker?.()
    }
  }
  
  const onSelect = (month: number) => {
    onSelectMonth?.(month)
    onSelectCell?.(month)
  }
  
  const toMonth = to && year === to.getFullYear() ? to.getMonth() : undefined
  const fromMonth = from && year === from.getFullYear() ? from.getMonth() : undefined
  
  return (
    <MonthPicker
      onKeyDown={onKeyDown}
      from={fromMonth}
      to={toMonth}
      apiRef={monthPickerApiRef}
      active={activeMonth}
      onChangeActive={changeActiveMonth}
      inert={picker !== 'month'}
      variant={variant}
      size={size}
      data-visible={picker === 'month'}
      className={style.picker}
      defaultActive={month}
      selected={month}
      selection='single'
      onSelectCell={onSelect}
      {...props}
    />
  )
}