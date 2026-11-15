import { FC, HTMLAttributes, ReactNode, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { MonthPicker } from '../../../MonthPicker';
import { useSnapshot } from '../../../internals/widget';
import { useCalendarInternalContext, useCalendarPartsContext } from '../../contexts';
import { MONTHS } from '@vega-ui/widgets/calendar';
import style from './style.module.css'

export interface CalendarMonthsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /**
   * Ref to the month grid element.
   */
  ref?: Ref<HTMLDivElement>

  /**
   * Content of the month grid, usually `CalendarMonthsGrid`.
   */
  children: ReactNode
}

/**
 * `CalendarMonths` is the month view of `Calendar`: the months of the year of
 * the focused day, 12 or 13 depending on the calendar system. It is mounted
 * while the month view is open and until its exit transition ends. Picking a
 * month shows its days; Escape goes back to the days without changing the month.
 */
export const CalendarMonths: FC<CalendarMonthsProps> = ({ children, ref, className, ...props }) => {
  const { months } = useCalendarPartsContext()
  const { handle, widget, view } = useCalendarInternalContext()
  const open = view === 'month'
  const mounted = useSnapshot(handle, (state) => widget.mountedOf(state, 'month'))
  const rootRef = useMergeRefs([handle.part(MONTHS), ref])

  if (!mounted) return null

  return (
    <MonthPicker
      {...months}
      ref={rootRef}
      data-visible={open}
      inert={!open}
      className={csx(style.picker, className)}
      {...props}
    >
      {children}
    </MonthPicker>
  )
}
