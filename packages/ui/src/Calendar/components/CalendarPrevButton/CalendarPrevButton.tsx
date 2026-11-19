import { FC } from 'react';
import { type ButtonProps, type ButtonShape } from '../../../Button';
import { CalendarStepButton } from '../CalendarStepButton';

export type CalendarPrevButtonProps = ButtonProps

/**
 * `CalendarPrevButton` shows the previous page of the current view: in the
 * days it moves the focused day to the same day of the previous month and
 * keeps the focus on the button; in the years it shows the previous page of
 * years. It is hidden in the months and when the previous month is before `min`.
 *
 * Pass the chevron as its children, with `square` and an `aria-label` for
 * an icon alone; an icon inside it is mirrored in a right-to-left layout.
 */
export const CalendarPrevButton: FC<CalendarPrevButtonProps & ButtonShape> = (props) => <CalendarStepButton step={-1} {...props} />
