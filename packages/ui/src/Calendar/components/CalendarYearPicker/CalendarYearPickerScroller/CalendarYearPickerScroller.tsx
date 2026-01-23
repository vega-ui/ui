import { FC } from 'react';
import { YearPickerScroller, YearPickerScrollerProps } from '../../../../YearPicker';
import { useCalendarContext } from '../../../contexts';
import { mergeRefs } from '@vega-ui/utils';
import { getIndexByYear } from '../../../../YearPicker/helpers';

export type CalendarYearPickerScrollerProps = YearPickerScrollerProps

/**
 * `CalendarYearPickerScroller` is a calendar-scoped alias for the
 * `YearPickerScroller` component. It provides the scrollable viewport
 * used by `CalendarYearPicker` to navigate through large ranges of years,
 * while delegating all interactive and virtualized scrolling behavior to
 * the underlying year-picker implementation.
 */
export const CalendarYearPickerScroller: FC<CalendarYearPickerScrollerProps> = ({ apiRef, ...props }) => {
  const { referenceDate, scrollerYearApiRef } = useCalendarContext()
  
  return (
    <YearPickerScroller
      apiRef={mergeRefs([scrollerYearApiRef, apiRef])}
      referenceYear={referenceDate.getFullYear()}
      {...props}
    />
  )
}