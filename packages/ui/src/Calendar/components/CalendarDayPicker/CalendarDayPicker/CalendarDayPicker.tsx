import { DayPicker, DayPickerProps } from '../../../../DayPicker';
import { isDisabledDate } from '../../../helpers';
import { useCalendarBaseContext } from '../../../../CalendarBase';
import { useCalendarContext } from '../../../contexts';
import { type DataGridSelection } from '../../../../DataGridSelectable';
import style from './style.module.css';
import { csx } from '@vega-ui/utils';

export type CalendarDayPickerProps<S extends DataGridSelection = 'single'> = DayPickerProps<S>

/**
 * `CalendarDayPicker` is the day-level view of `Calendar` that bridges the
 * high-level calendar state with the low-level `DayPicker` grid.
 * */
export const CalendarDayPicker = <S extends DataGridSelection = 'single'>({
  onSelectCell,
  className,
  ...props
}: CalendarDayPickerProps<S>) => {
  const {
    dayPickerApiRef,
    activeDay,
    onSelectDay,
    changeActiveDay,
    defaultValue,
    picker,
    value,
    selection,
    from,
    to,
    year,
    month,
    disabled
  } = useCalendarContext()
  const { size, variant } = useCalendarBaseContext()
  
  const selected = Array.isArray(value) ? value.map((v: Date | undefined) => v?.getTime()).filter(Boolean) as number[] : value?.getTime()
  const defaultSelected = Array.isArray(defaultValue) ? defaultValue.map((v: Date | undefined) => v?.getTime()).filter(Boolean) as number[] : defaultValue?.getTime()
  
  const onSelect = (value: number | number[]) => {
    onSelectDay?.(value)
    onSelectCell?.(value as S extends 'single' ? number : number[])
  }
  
  const isDisabled = (day: number) => isDisabledDate(day, disabled ?? [])

  return (
    <DayPicker
      year={year}
      month={month}
      defaultSelected={defaultSelected}
      disabled={isDisabled}
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
      className={csx(style.picker, className)}
      {...props}
    />
  )
}