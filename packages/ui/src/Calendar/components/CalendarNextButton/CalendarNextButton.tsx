import { FC } from 'react';
import { type IconButtonProps } from '../../../IconButton';
import { CalendarStepButton } from '../CalendarStepButton';

export type CalendarNextButtonProps = IconButtonProps

/**
 * `CalendarNextButton` shows the next page of the current view: in the days
 * it moves the focused day to the same day of the next month and keeps the
 * focus on the button; in the years it shows the next page of years. It is
 * hidden in the months and when the next month is after `max`.
 *
 * It shows a chevron by default; pass `children` to replace it. The icon has
 * no text, so give the button an `aria-label`.
 */
export const CalendarNextButton: FC<CalendarNextButtonProps> = (props) => <CalendarStepButton step={1} {...props} />
