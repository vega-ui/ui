import { DayPicker, DayPickerProps } from '../../../../DayPicker';
import { isDisabledDate } from '../../../helpers';
import { useBaseCalendarContext } from '../../../../BaseCalendar';
import { useCalendarContext } from '../../../contexts';
import { type DataGridSelection } from '../../../../DataGridSelectable';
import style from './style.module.css';

export type CalendarDayPickerProps<S extends DataGridSelection = 'single'> = DayPickerProps<S>

/**
 * `CalendarDayPicker` is the day-level view of `Calendar` that bridges the
 * high-level calendar state with the low-level `DayPicker` grid.
 * */
export const CalendarDayPicker = <S extends DataGridSelection = 'single'>({ onSelectCell, ...props }: CalendarDayPickerProps<S>) => {
  const {
    dayPickerApiRef,
    activeDay,
    onSelectDay,
    changeActiveDay,
    picker,
    value,
    selection,
    from,
    to,
  } = useCalendarContext()
  const { size, variant } = useBaseCalendarContext()
  
  const selected = Array.isArray(value) ? value.map((v: Date) => v.getTime()) : value?.getTime()
  
  const onSelect = (value: number | number[]) => {
    onSelectDay?.(value)
    onSelectCell?.(value as S extends 'single' ? number : number[])
  }
  
  return (
    <DayPicker
      disabled={isDisabledDate}
      apiRef={dayPickerApiRef}
      active={activeDay}
      onChangeActive={changeActiveDay}
      inert={picker !== 'day'}
      selected={selected as DayPickerProps<S>['selected']}
      variant={variant}
      size={size}
      selection={selection}
      onSelectCell={onSelect}
      to={to?.getTime()}
      from={from?.getTime()}
      data-visible={picker === 'day'}
      className={style.picker}
      {...props}
    />
  )
}