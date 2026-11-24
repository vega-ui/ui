import { FC, ReactNode } from 'react';
import { createInput } from '@vega-ui/core';
import { getTimeWheelOptions, getTimeWheelValue, PICK_VALUE, pickTimeWheel, TimeFieldUnit } from '@vega-ui/widgets/time-field';
import { useSnapshot } from '../../../internals/widget';
import { WheelPickerColumn, WheelPickerColumnProps } from '../../../WheelPicker';
import { TimeFieldOptionProvider, useTimeFieldContext } from '../../contexts';

export interface TimeFieldColumnProps extends Omit<WheelPickerColumnProps<string>, 'value' | 'defaultValue' | 'onChangeValue' | 'loop' | 'children'> {
  /**
   * Part of the time the column turns: the hours 00 to 23, or the minutes or the seconds by `step`.
   * The seconds go with `format="HH:mm:ss"`.
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

/** TimeFieldColumn is a WheelPickerColumn of one part of the time of its TimeField, chosen by `unit`. Turning it writes the time into the input; the times outside `min` and `max` are disabled. Its children are the template of an option, usually `<TimeFieldOption><WheelPickerFace /></TimeFieldOption>`; read the option with `useTimeFieldOptionContext()`. Place it inside a WheelPicker and name it with aria-label or aria-labelledby */
export const TimeFieldColumn: FC<TimeFieldColumnProps> = ({ unit, loop = true, children, ...props }) => {
  const { handle, disabled, readOnly } = useTimeFieldContext()
  const value = useSnapshot(handle, (state) => state.value)
  const { min, max, step, format } = useSnapshot(handle, (state) => state.options)
  const wheel = { min, max, step, seconds: format === 'HH:mm:ss' }

  const onChangeValue = (picked: string) => handle.send(createInput(PICK_VALUE, { to: pickTimeWheel(unit, picked, value, wheel) }))

  return (
    <WheelPickerColumn
      value={getTimeWheelValue(unit, value, wheel)}
      onChangeValue={onChangeValue}
      loop={loop}
      disabled={disabled}
      readOnly={readOnly}
      {...props}
    >
      {getTimeWheelOptions(unit, value, wheel).map((option) => (
        <TimeFieldOptionProvider key={option.value} unit={unit} value={option.value} disabled={option.disabled}>
          {children}
        </TimeFieldOptionProvider>
      ))}
    </WheelPickerColumn>
  )
}
