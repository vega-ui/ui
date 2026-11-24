import { FC, ReactNode } from 'react';
import { createInput } from '@vega-ui/core';
import { getDateTimeWheelOptions, getDateTimeWheelValue, PICK_VALUE, pickDateTimeWheel } from '@vega-ui/widgets/date-time-field';
import { TimeFieldUnit } from '@vega-ui/widgets/time-field';
import { useSnapshot } from '../../../internals/widget';
import { TimeFieldOptionProvider } from '../../../TimeField/contexts';
import { WheelPickerColumn, WheelPickerColumnProps } from '../../../WheelPicker';
import { useDateTimeFieldContext } from '../../contexts';

export interface DateTimeFieldColumnProps extends Omit<WheelPickerColumnProps<string>, 'value' | 'defaultValue' | 'onChangeValue' | 'loop' | 'children'> {
  /**
   * Part of the time the column turns: the hours 00 to 23, or the minutes or the seconds by `timeStep`.
   * The seconds go with `timeFormat="HH:mm:ss"`.
   */
  unit: TimeFieldUnit

  /**
   * Template of an option, rendered once for every option of the column.
   * Read the option with `useTimeFieldOptionContext()`; usually `<TimeFieldOption><WheelPickerFace /></TimeFieldOption>`.
   */
  children: ReactNode

  /**
   * If true, the column goes on past its last option to the first one and back, like a dial.
   * @default true
   */
  loop?: boolean
}

/** DateTimeFieldColumn is a WheelPickerColumn of one part of the time of its DateTimeField, chosen by `unit`. Turning it writes the date and the time into the input, today within `min` and `max` while the field is empty; the times outside `min` and `max` are disabled on their days. Its children are the template of an option, usually `<TimeFieldOption><WheelPickerFace /></TimeFieldOption>`; read the option with `useTimeFieldOptionContext()`. Place it inside a WheelPicker and name it with aria-label or aria-labelledby */
export const DateTimeFieldColumn: FC<DateTimeFieldColumnProps> = ({ unit, loop = true, children, ...props }) => {
  const { handle, min, max, today, disabled, readOnly } = useDateTimeFieldContext()
  const value = useSnapshot(handle, (state) => state.value)
  const { timeFormat, timeStep } = useSnapshot(handle, (state) => state.options)
  const wheel = { min, max, today: today ?? '', step: timeStep, seconds: timeFormat === 'HH:mm:ss' }

  const onChangeValue = (picked: string) => handle.send(createInput(PICK_VALUE, { to: pickDateTimeWheel(unit, picked, value, wheel) }))

  return (
    <WheelPickerColumn
      value={getDateTimeWheelValue(unit, value, wheel)}
      onChangeValue={onChangeValue}
      loop={loop}
      disabled={disabled}
      readOnly={readOnly}
      {...props}
    >
      {getDateTimeWheelOptions(unit, value, wheel).map((option) => (
        <TimeFieldOptionProvider key={option.value} unit={unit} value={option.value} disabled={option.disabled}>
          {children}
        </TimeFieldOptionProvider>
      ))}
    </WheelPickerColumn>
  )
}
