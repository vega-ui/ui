import { FC, PropsWithChildren } from 'react';
import style from './style.module.css'
import { Text, TextProps } from '../../../Text';
import { csx } from '@vega-ui/utils';
import { sizeMapper } from './helpers';
import { useCalendarBaseContext } from '../../contexts';

export type CalendarBaseWeekLabelProps = TextProps

/**
 * `CalendarBaseWeekLabel` is the foundational component for rendering
 * weekday headers (e.g., “Mon”, “Tue”, “Wed”) in the calendar grid.
 * It wraps the generic `Text` component to provide the correct semantics,
 * styling, and size mapping for week labels inside any calendar view.
 */
export const CalendarBaseWeekLabel: FC<PropsWithChildren<CalendarBaseWeekLabelProps>> = ({ children, className, ...props }) => {
  const { size } = useCalendarBaseContext()
  
  return (
    <Text role='columnheader' className={csx(style.label, className)} size={sizeMapper(size)} {...props}>
      {children}
    </Text>
  )
}