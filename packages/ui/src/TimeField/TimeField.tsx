import { FC } from 'react';
import { useWidget, widgetEnvironment } from '../internals/widget';
import { TextField, TextFieldProps } from '../TextField';
import { TimeFieldProvider } from './contexts';
import { timeFieldWidget } from '@vega-ui/widgets/time-field';

export interface TimeFieldProps extends Omit<TextFieldProps, 'defaultValue'> {
  /**
   * Controlled time as a `HH:mm` string (`HH:mm:ss` when the format has
   * seconds), `''` while the field has no complete value.
   */
  value?: string

  /**
   * Initial time for uncontrolled usage, like `value`.
   * Defaults to `''`, an empty field.
   */
  defaultValue?: string

  /**
   * Called with the time when it changes, `''` when the text is emptied or
   * incomplete.
   */
  onChangeValue?(value: string): void

  /**
   * Time format used for input masking and parsing, in the notation of
   * Unicode date patterns like `DateTimeField.timeFormat`.
   *
   * Examples:
   * - "HH:mm" — hours and minutes.
   * - "HH:mm:ss" — hours, minutes, and seconds.
   */
  format?: 'HH:mm' | 'HH:mm:ss'

  /**
   * Earliest allowed time as a `HH:mm` or `HH:mm:ss` string. Like a native
   * `<input type="time">`, an earlier time makes the input invalid.
   */
  min?: string

  /**
   * Latest allowed time as a `HH:mm` or `HH:mm:ss` string. Like a native
   * `<input type="time">`, a later time makes the input invalid.
   */
  max?: string

  /**
   * Step of ArrowUp / ArrowDown on the minutes or seconds under the caret,
   * wrapping around the segment's range. Like a native `<input type="time">`
   * with `step`, the hours always move by one. A step past `min` or `max`
   * stops at the bound. `0` turns arrow stepping off.
   *
   * Defaults to `1`.
   */
  step?: number
}

/**
 * TimeField — a masked time input with its value on the root.
 *
 * The time is a `HH:mm` or `HH:mm:ss` string reported by `onChangeValue`;
 * the input shows it by `format`. A time outside `min` and `max` makes the
 * input invalid, and resetting the surrounding form restores `defaultValue`.
 */
export const TimeField: FC<TimeFieldProps> = ({
  format = 'HH:mm',
  min,
  max,
  step = 1,
  value,
  defaultValue = '',
  onChangeValue,
  ...props
}) => {
  const handle = useWidget(timeFieldWidget, { format, min, max, step, value, defaultValue, onChangeValue }, widgetEnvironment)

  return (
    <TimeFieldProvider handle={handle}>
      <TextField {...props} />
    </TimeFieldProvider>
  )
}
