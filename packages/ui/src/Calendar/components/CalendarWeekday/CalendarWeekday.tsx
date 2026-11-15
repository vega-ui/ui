import { FC } from 'react';
import { Text, TextProps } from '../../../Text';
import { useCalendarInternalContext, useCalendarWeekdayContext } from '../../contexts';
import { getWeekdayTextSize } from '../../helpers';
import { csx } from '@vega-ui/utils';
import { GridColumnHeader } from '../../../Grid';
import style from './style.module.css';

export type CalendarWeekdayProps = TextProps

/**
 * `CalendarWeekday` is a weekday name of `CalendarWeekdays`. Place it as the
 * template of `CalendarWeekdays`; without children it shows the weekday name.
 * It is a `GridColumnHeader` of the day grid, excluded from the keyboard navigation.
 */
export const CalendarWeekday: FC<CalendarWeekdayProps> = ({ children, className, ...props }) => {
  const { col, label } = useCalendarWeekdayContext()
  const { size } = useCalendarInternalContext()

  return (
    <GridColumnHeader col={col} excluded asChild>
      <Text className={csx(style.label, className)} size={getWeekdayTextSize(size)} {...props}>
        {children ?? label}
      </Text>
    </GridColumnHeader>
  )
}
