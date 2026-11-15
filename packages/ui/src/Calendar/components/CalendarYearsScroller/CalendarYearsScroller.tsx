import { FC, PropsWithChildren } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { YearPickerScroller, YearPickerScrollerProps } from '../../../YearPicker';
import { useCalendarInternalContext } from '../../contexts';
import { YEARS_SCROLLER } from '@vega-ui/widgets/calendar';

export type CalendarYearsScrollerProps = Omit<YearPickerScrollerProps, 'apiRef'>

/**
 * `CalendarYearsScroller` makes the pages of `CalendarYears` swipeable: it
 * holds a page of years per `CalendarYearsScrollerContent`. The previous and next
 * buttons scroll it. Without it the years show only the page of the
 * focused year.
 */
export const CalendarYearsScroller: FC<PropsWithChildren<CalendarYearsScrollerProps>> = ({ ref, ...props }) => {
  const { handle, disabled } = useCalendarInternalContext()
  const scrollerRef = useMergeRefs([handle.part(YEARS_SCROLLER), ref])

  return <YearPickerScroller ref={scrollerRef} inert={disabled} {...props} />
}
