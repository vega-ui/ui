'use client';

import { FC } from 'react';
import { RangeSliderThumbProvider, useRangeSliderContext } from '../../contexts';
import { SliderBaseThumb, SliderBaseThumbProps } from '../../../SliderBase';

export interface RangeSliderThumbProps extends SliderBaseThumbProps {
  /**
   * Index of the thumb: 0 for the left (start), 1 for the right (end).
   * Used to determine which part of the range this thumb controls.
   */
  index: 0 | 1
}

/** RangeSliderThumb is one of the two draggable handles in a range slider.
 *  It lets users adjust either the start or end of the selected value range.
 *  Each thumb moves independently within allowed limits and updates the range as it's dragged. */
export const RangeSliderThumb: FC<RangeSliderThumbProps> = ({ value, index, ...props }) => {
  const { value: _value, orientation, max, min, minRange = 0 } = useRangeSliderContext()
  
  const v = value ?? _value[index]
  const mx = index === 0 ? _value[1] - minRange : max
  const mn = index === 1 ? _value[0] + minRange : min

  return (
    <RangeSliderThumbProvider index={index} max={mx} min={mn} value={v}>
      <SliderBaseThumb
        data-index={index}
        orientation={orientation}
        aria-valuemax={mx}
        aria-valuemin={mn}
        value={v}
        {...props}
      />
    </RangeSliderThumbProvider>
  )
}