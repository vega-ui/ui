import { FC } from 'react';
import { type ButtonProps, type ButtonShape } from '../../../Button';
import { CalendarStepButton } from '../CalendarStepButton';

export type CalendarNextButtonProps = ButtonProps

/**
 * `CalendarNextButton` shows the next page of the current view: in the days
 * it moves the focused day to the same day of the next month and keeps the
 * focus on the button; in the years it shows the next page of years. It is
 * hidden in the months and when the next month is after `max`.
 *
 * Pass the chevron as its children, with `square` and an `aria-label` for
 * an icon alone; an icon inside it is mirrored in a right-to-left layout.
 */
export const CalendarNextButton: FC<CalendarNextButtonProps & ButtonShape> = (props) => <CalendarStepButton step={1} {...props} />
