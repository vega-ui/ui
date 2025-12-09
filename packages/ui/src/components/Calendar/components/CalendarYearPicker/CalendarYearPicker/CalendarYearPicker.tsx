import { FC, KeyboardEvent } from 'react';
import { YearPicker, YearPickerProps } from '../../../../YearPicker';
import { useCalendarContext } from '../../../hooks';
import { useBaseCalendarContext } from '../../../../BaseCalendar';
import style from './style.module.css'
import { csx, mergeEventHandlers, mergeRefs } from '@vega-ui/utils';

export interface CalendarYearPickerProps extends Omit<YearPickerProps, 'from' | 'to'> {
  /**
   * Optional callback that runs when the user presses `Escape` while the
   * year picker is active. Can be used to hook into close events (e.g.,
   * analytics, external state updates) before the picker is actually
   * dismissed by the calendar.
   */
  onClose?(e: KeyboardEvent<HTMLDivElement>): void
}

/**
 * `CalendarYearPicker` is the calendar-integrated year selection view that
 * wraps the low-level `YearPicker` component. It connects year selection
 * and focus management to the calendar’s state machine while enforcing
 * global date constraints and picker-mode visibility.
 */
export const CalendarYearPicker: FC<CalendarYearPickerProps> = ({ className, apiRef, onKeyDown: _onKeyDown, onClose, onSelectCell, ...props }) => {
  const {
    from,
    to,
    picker,
    year,
    activeYear,
    changeActiveYear,
    yearPickerApiRef,
    closeYearPicker,
    onSelectYear,
  } = useCalendarContext()
  const { size, variant } = useBaseCalendarContext()
  
  const toYear = to ? to.getFullYear() : undefined
  const fromYear = from ? from.getFullYear() : undefined
  
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose?.(e)
      closeYearPicker?.()
    }
  }
  
  const onSelect = (year: number) => {
    onSelectYear?.(year)
    onSelectCell?.(year)
  }
  
  return (
    <YearPicker
      selection='single'
      data-visible={picker === 'year'}
      selected={year}
      active={activeYear}
      defaultActive={year}
      onChangeActive={changeActiveYear}
      variant={variant}
      size={size}
      inert={picker !== 'year'}
      from={fromYear}
      to={toYear}
      className={csx(style.picker, className)}
      apiRef={mergeRefs([apiRef, yearPickerApiRef])}
      onKeyDown={mergeEventHandlers(_onKeyDown, onKeyDown)}
      onSelectCell={onSelect}
      {...props}
    />
  )
}