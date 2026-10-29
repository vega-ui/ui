import { FC, useRef, useState } from 'react';
import { TextField, TextFieldProps } from '../TextField';
import { TimeFieldProvider } from './contexts';
import { useControlledState, useFormReset } from '@vega-ui/hooks';
import { formatTemplateTime, getTimeTemplate, isISOTime, parseTemplateTime } from '@vega-ui/utils';

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
   * `<input type="time">`, a complete time earlier than `min` is clamped to it.
   */
  min?: string

  /**
   * Latest allowed time as a `HH:mm` or `HH:mm:ss` string. Like a native
   * `<input type="time">`, a complete time later than `max` is clamped to it.
   */
  max?: string

  /**
   * Step of ArrowUp / ArrowDown on the minutes or seconds under the caret,
   * wrapping around the segment's range. Like a native `<input type="time">`
   * with `step`, the hours always move by one. `0` turns arrow stepping off.
   *
   * Defaults to `1`.
   */
  step?: number
}

/**
 * TimeField — a masked time input with its value on the root.
 *
 * The time is a `HH:mm` or `HH:mm:ss` string reported by `onChangeValue`;
 * the input shows it by `format`. A complete time is clamped to `min` and
 * `max`, and resetting the surrounding form restores `defaultValue`.
 */
export const TimeField: FC<TimeFieldProps> = ({
  format = 'HH:mm',
  min: _min,
  max: _max,
  step = 1,
  value,
  defaultValue = '',
  onChangeValue,
  ...props
}) => {
  const min = isISOTime(_min) ? _min : undefined
  const max = isISOTime(_max) ? _max : undefined
  const [time, setTime] = useControlledState(value, defaultValue, onChangeValue)
  const [text, setText] = useState('')

  const inputInnerRef = useRef<HTMLInputElement>(null)

  const template = getTimeTemplate(format)

  const getTime = (text: string) => parseTemplateTime(text, template) ?? ''
  const getText = (time: string) => time ? formatTemplateTime(time, template) : ''

  const shownText = getTime(text) === time ? text : getText(time)

  const changeText = (text: string) => {
    setText(text)

    const nextTime = getTime(text)
    if (nextTime !== time) setTime(nextTime)
  }

  useFormReset(inputInnerRef, () => {
    if (value !== undefined) return

    setText(getText(defaultValue))
    setTime(defaultValue)
  })

  return (
    <TimeFieldProvider
      template={template}
      min={min}
      max={max}
      step={step}
      text={shownText}
      changeText={changeText}
      inputRef={inputInnerRef}
    >
      <TextField {...props} />
    </TimeFieldProvider>
  )
}
