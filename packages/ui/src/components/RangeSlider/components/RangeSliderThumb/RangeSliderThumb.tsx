'use client';

import { FC } from 'react';
import { useRangeSliderContext } from '../../hooks';
import { SliderBaseThumb, SliderBaseThumbProps } from '../../../SliderBase';

export interface RangeSliderThumbProps extends Omit<SliderBaseThumbProps, 'value'> {
  /**
   * Optional name for the thumb (e.g., for form integration).
   */
  name?: string

  /**
   * Optional ID for the thumb element.
   * Useful for accessibility and targeting.
   */
  id?: string

  /**
   * Index of the thumb: 0 for the left (start), 1 for the right (end).
   * Used to determine which part of the range this thumb controls.
   */
  index: number

  /**
   * Optional custom class name for styling the thumb.
   */
  className?: string

  /**
   * The current full range value as a readonly tuple [start, end].
   * The thumb uses `index` to access its corresponding value.
   */
  value?: readonly [number, number]
}

/** RangeSliderThumb is one of the two draggable handles in a range slider.
 *  It lets users adjust either the start or end of the selected value range.
 *  Each thumb moves independently within allowed limits and updates the range as it's dragged. */
export const RangeSliderThumb: FC<RangeSliderThumbProps> = ({ name, id, value: _value, className, index, ...props }) => {
  const { value, orientation, max, min, minRange = 0 } = useRangeSliderContext()

  return (
    <SliderBaseThumb
      className={className}
      data-index={index}
      orientation={orientation}
      name={name}
      id={id}
      aria-valuemax={index === 0 ? value[1] - minRange : max}
      aria-valuemin={index === 1 ? value[0] + minRange : min}
      value={(_value ?? value)[index]}
      {...props}
    />
  )
}