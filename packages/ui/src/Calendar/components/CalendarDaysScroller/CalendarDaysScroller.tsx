import { FC, PropsWithChildren } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { DayPickerScroller, DayPickerScrollerProps } from '../../../DayPicker';
import { useCalendarInternalContext } from '../../contexts';
import { DAYS_SCROLLER } from '@vega-ui/widgets/calendar';

export type CalendarDaysScrollerProps = Omit<DayPickerScrollerProps, 'apiRef'>

/**
 * `CalendarDaysScroller` makes the months of `CalendarDays` swipeable: it
 * holds a page per month, `CalendarDaysScrollerContent`, and swiping to a month moves
 * the focused day to the same day there. The previous and next buttons
 * scroll it. Without it the days show only the month of the focused day.
 */
export const CalendarDaysScroller: FC<PropsWithChildren<CalendarDaysScrollerProps>> = ({ ref, ...props }) => {
  const { handle, disabled } = useCalendarInternalContext()
  const scrollerRef = useMergeRefs([handle.part(DAYS_SCROLLER), ref])

  return <DayPickerScroller ref={scrollerRef} inert={disabled} {...props} />
}
