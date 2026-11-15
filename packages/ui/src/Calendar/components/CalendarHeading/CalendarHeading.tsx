import { FC, HTMLAttributes } from 'react';
import { csx } from '@vega-ui/utils';
import { HeadingAs } from '../../../Heading';
import { useCalendarInternalContext } from '../../contexts';
import { CalendarMonthLabel } from '../CalendarMonthLabel';
import { CalendarYearLabel } from '../CalendarYearLabel';
import style from './style.module.css';

export interface CalendarHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * The heading tag to render, so the calendar fits the outline of the page,
   * like `as` of `Heading`.
   * @default "h2"
   */
  as?: HeadingAs
}

/**
 * `CalendarHeading` is the heading of the shown month: it names the day grid
 * (`aria-labelledby`) and announces the month politely (`aria-live`) when it
 * changes. Without children, it shows the month and the year; usually it wraps the
 * `CalendarViewButton`s, so they are the visible month and year.
 */
export const CalendarHeading: FC<CalendarHeadingProps> = ({ as: Element = 'h2', children, className, ...props }) => {
  const { headingId } = useCalendarInternalContext()

  return (
    <Element id={headingId} aria-live='polite' className={csx(style.heading, className)} {...props}>
      {children ?? <><CalendarMonthLabel /> <CalendarYearLabel /></>}
    </Element>
  )
}
