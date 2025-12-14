import { FC, HTMLAttributes } from 'react';
import { CalendarBaseHeader } from '../../../CalendarBase';

export type CalendarHeaderProps = HTMLAttributes<HTMLDivElement>

export const CalendarHeader: FC<CalendarHeaderProps> = (props) => {
  return <CalendarBaseHeader {...props} />
}