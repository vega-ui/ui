import { FC } from 'react';
import { type IconButtonProps } from '../../../IconButton';
import { CalendarStepButton } from '../CalendarStepButton';

export type CalendarPrevButtonProps = IconButtonProps

/**
 * `CalendarPrevButton` shows the previous page of the current view: in the
 * days it moves the focused day to the same day of the previous month and
 * keeps the focus on the button; in the years it shows the previous page of
 * years. It is hidden in the months and when the previous month is before `min`.
 *
 * It shows a chevron by default; pass `children` to replace it. The icon has
 * no text, so give the button an `aria-label`.
 */
export const CalendarPrevButton: FC<CalendarPrevButtonProps> = (props) => <CalendarStepButton step={-1} {...props} />
