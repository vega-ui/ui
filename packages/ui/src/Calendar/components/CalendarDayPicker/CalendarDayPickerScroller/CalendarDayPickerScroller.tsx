import { FC } from 'react';
import { DayPickerScroller, DayPickerScrollerProps } from '../../../../DayPicker';
import { useCalendarContext } from '../../../contexts';
import { mergeRefs } from '@vega-ui/utils';

export type CalendarDayPickerScrollerProps = DayPickerScrollerProps;

/**
 * `CalendarDayPickerScroller` integrates the low-level `DayPickerScroller`
 * with the high-level calendar state and navigation logic provided by
 * `useCalendarContext()`. It synchronizes scroll snapping with the
 * calendar’s internal month navigation model and exposes a unified
 * imperative API reference for external control.
 */
export const CalendarDayPickerScroller: FC<CalendarDayPickerScrollerProps> = ({ apiRef, ...props }) => {
  const { scrollerApiRef, changePeriod, referenceDate } = useCalendarContext()
  
  return (
    <DayPickerScroller
      referenceDate={referenceDate}
      apiRef={mergeRefs([scrollerApiRef, apiRef])}
      onChangePeriod={changePeriod}
      {...props}
    />
  )
}