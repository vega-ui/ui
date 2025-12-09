'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { CalendarContext, CalendarContextState } from './context.ts';

type CalendarProviderProps = CalendarContextState

export const CalendarProvider: FC<PropsWithChildren<CalendarProviderProps>> = ({
  from,
  to,
  month,
  next,
  prev,
  value: selectedValue,
  activeYear,
  activeDay,
  activeMonth,
  year,
  selection,
  picker,
  changeActiveDay,
  changeActiveMonth,
  changeActiveYear,
  changePicker,
  monthPickerApiRef,
  yearPickerApiRef,
  dayPickerApiRef,
  scrollerApiRef,
  closeYearPicker,
  closeMonthPicker,
  onSelectYear,
  onSelectMonth,
  onSelectDay,
  onSnap,
  onYearPickerClick,
  onMonthPickerClick,
  children
}) => {
  const value = useMemo(() => ({
    from,
    to,
    month,
    next,
    prev,
    value: selectedValue,
    selection,
    year,
    picker,
    activeYear,
    activeDay,
    activeMonth,
    changePicker,
    changeActiveDay,
    changeActiveMonth,
    changeActiveYear,
    scrollerApiRef,
    monthPickerApiRef,
    yearPickerApiRef,
    dayPickerApiRef,
    closeYearPicker,
    closeMonthPicker,
    onSelectYear,
    onSelectMonth,
    onSelectDay,
    onSnap,
    onYearPickerClick,
    onMonthPickerClick,
  }), [
    from,
    to,
    month,
    year,
    picker,
    selection,
    selectedValue,
    next,
    prev,
    activeYear,
    activeMonth,
    activeDay,
    changePicker,
    changeActiveDay,
    changeActiveMonth,
    changeActiveYear,
    closeYearPicker,
    closeMonthPicker,
    onSelectYear,
    onSelectMonth,
    onSelectDay,
    onYearPickerClick,
    onMonthPickerClick,
    onSnap
  ])

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  )
}