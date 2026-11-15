import { FC, HTMLAttributes, ReactNode, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { YearPicker } from '../../../YearPicker';
import { useSnapshot } from '../../../internals/widget';
import { useCalendarInternalContext, useCalendarPartsContext } from '../../contexts';
import { YEARS } from '@vega-ui/widgets/calendar';
import style from './style.module.css'

export interface CalendarYearsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /**
   * Ref to the year grid element.
   */
  ref?: Ref<HTMLDivElement>

  /**
   * Content of the year grid: `CalendarYearsGrid`, or `CalendarYearsScroller`
   * with pages of it.
   */
  children: ReactNode
}

/**
 * `CalendarYears` is the year view of `Calendar`: pages of years, swipeable,
 * in the calendar system of the `Calendar` (an era change gives two years).
 * It is mounted while the year view is open and until its exit transition
 * ends. Picking a year shows the same month of it; Escape goes back to the days.
 */
export const CalendarYears: FC<CalendarYearsProps> = ({ children, className, ref, ...props }) => {
  const { years } = useCalendarPartsContext()
  const { handle, widget, view } = useCalendarInternalContext()
  const open = view === 'year'
  const mounted = useSnapshot(handle, (state) => widget.mountedOf(state, 'year'))
  const rootRef = useMergeRefs([handle.part(YEARS), ref])

  if (!mounted) return null

  return (
    <YearPicker
      {...years}
      ref={rootRef}
      data-visible={open}
      inert={!open}
      className={csx(style.picker, className)}
      {...props}
    >
      {children}
    </YearPicker>
  )
}
