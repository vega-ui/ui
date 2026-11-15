import { FC, PropsWithChildren } from 'react';
import { YearPickerScrollerContent, YearPickerScrollerContentProps } from '../../../YearPicker';
import { CalendarScrollerProvider } from '../../contexts';

export type CalendarYearsScrollerContentProps = YearPickerScrollerContentProps

/**
 * `CalendarYearsScrollerContent` is a page of `CalendarYearsScroller`, rendered once per
 * page of years. `CalendarYearsGrid` inside it shows the years of the page.
 */
export const CalendarYearsScrollerContent: FC<PropsWithChildren<CalendarYearsScrollerContentProps>> = ({ children, ...props }) => {
  return (
    <YearPickerScrollerContent {...props}>
      <CalendarScrollerProvider inScroller>{children}</CalendarScrollerProvider>
    </YearPickerScrollerContent>
  )
}
