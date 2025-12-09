import { FC } from 'react';
import { DayPickerScroller, DayPickerScrollerProps } from '../../../../DayPicker';
import { useCalendarContext } from '../../../hooks';
import { mergeRefs } from '@vega-ui/utils';

export type CalendarDayPickerScrollerProps = DayPickerScrollerProps;

/**
 * `CalendarDayPickerScroller` integrates the low-level `DayPickerScroller`
 * with the high-level calendar state and navigation logic provided by
 * `useCalendarContext()`. It synchronizes scroll snapping with the
 * calendar’s internal month navigation model and exposes a unified
 * imperative API reference for external control.
 */
export const CalendarDayPickerScroller: FC<CalendarDayPickerScrollerProps> = ({ onSnap: _onSnap, apiRef, ...props }) => {
  const { onSnap, scrollerApiRef } = useCalendarContext()
  
  const onSnapIndex = (index: number) => {
    _onSnap?.(index)
    onSnap?.(index)
  }
  
  return (
    <DayPickerScroller
      onSnap={onSnapIndex}
      apiRef={mergeRefs([scrollerApiRef, apiRef])}
      {...props}
    />
  )
}