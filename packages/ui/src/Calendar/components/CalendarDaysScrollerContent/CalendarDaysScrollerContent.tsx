import { FC, PropsWithChildren } from 'react';
import { DayPickerScrollerContent, DayPickerScrollerContentProps } from '../../../DayPicker';
import { CalendarScrollerProvider } from '../../contexts';

export type CalendarDaysScrollerContentProps = DayPickerScrollerContentProps

/**
 * `CalendarDaysScrollerContent` is a page of `CalendarDaysScroller`, rendered once per
 * month of the scroller. `CalendarWeeks` inside it shows the month of the page.
 */
export const CalendarDaysScrollerContent: FC<PropsWithChildren<CalendarDaysScrollerContentProps>> = ({ children, ...props }) => {
  return (
    <DayPickerScrollerContent {...props}>
      <CalendarScrollerProvider inScroller>{children}</CalendarScrollerProvider>
    </DayPickerScrollerContent>
  )
}
