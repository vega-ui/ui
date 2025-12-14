import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';

export type CalendarBaseHeaderProps = HTMLAttributes<HTMLDivElement>

/**
 * `CalendarBaseHeader` is the foundational layout container for the top
 * section of a calendar component. It is typically used to house
 * navigation buttons (`Prev` / `Next`) and picker-trigger controls
 * (`MonthPickerButton`, `YearPickerButton`), providing consistent
 * spacing, alignment, and styling for all header-related UI elements.
 */
export const CalendarBaseHeader: FC<PropsWithChildren<CalendarBaseHeaderProps>> = ({ className, children, ...props }) => {
  return (
    <div className={csx(style.header, className)} {...props}>
      {children}
    </div>
  )
}