'use client';

import { FC, PropsWithChildren } from 'react';
import { useRangeSliderContext } from '../../contexts';
import { SliderBaseProgress, SliderBaseProgressProps } from '../../../SliderBase';

export type RangeSliderRangeProps = SliderBaseProgressProps

/** RangeSliderProgress is the filled part of a range slider track that spans between two thumbs.
 *  It visually highlights the selected range, helping users understand the active portion between min and max. */
export const RangeSliderProgress: FC<PropsWithChildren<RangeSliderRangeProps>> = ({ ...props }) => {
  const { value, max, orientation } = useRangeSliderContext()

  return (
    <SliderBaseProgress max={max} from={value[0]} to={value[1]} orientation={orientation} {...props} />
  )
}