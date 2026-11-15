import { FC } from 'react';
import { YearPickerLayout, YearPickerScrollerLayout, YearPickerScrollerLayoutProps } from '../../../YearPicker';
import { useCalendarScrollerContext } from '../../contexts';

export type CalendarYearsGridProps = Omit<YearPickerScrollerLayoutProps, 'rows' | 'cols' | 'start' | 'locale'>

/**
 * `CalendarYearsGrid` is a page of 12 years in the calendar system of the
 * `Calendar`. Inside `CalendarYearsScrollerContent` it shows the years of the page;
 * placed right in `CalendarYears` it shows the page of the focused year.
 * Its children are the template of a year cell, usually `<CalendarYear />`.
 */
export const CalendarYearsGrid: FC<CalendarYearsGridProps> = (props) => {
  const { inScroller } = useCalendarScrollerContext()

  if (inScroller) return <YearPickerScrollerLayout {...props} />

  return <YearPickerLayout {...props} />
}
