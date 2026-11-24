import { FC } from 'react';
import { timeOf } from '@vega-ui/widgets/date-time-field';
import { useSnapshot } from '../../../internals/widget';
import { useDateTimeFieldContext } from '../../contexts';

export interface DateTimeFieldTimeProps {
  /**
   * Text shown while the field has no complete date and time, for example `--:--`.
   */
  placeholder?: string
}

/**
 * DateTimeFieldTime shows the time of its DateTimeField in its `timeFormat`, `HH:mm` or `HH:mm:ss`,
 * and `placeholder` while the field has no complete date and time.
 * Place it in the button that opens the time wheels, like the time button under the calendar on iOS.
 * It renders text only, so the button owns the element and the style.
 */
export const DateTimeFieldTime: FC<DateTimeFieldTimeProps> = ({ placeholder }) => {
  const { handle } = useDateTimeFieldContext()
  const time = useSnapshot(handle, timeOf)

  return time || placeholder
}
