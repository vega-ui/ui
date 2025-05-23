'use client';

import { FC, PropsWithChildren } from 'react';
import { SliderBaseProgress, SliderBaseProgressProps } from '../../../SliderBase';
import { useSliderContext } from '../../hooks';

export type SliderProgressProps = SliderBaseProgressProps

/** SliderProgress is a visual element that shows the filled portion of the slider track.
 *  It extends from the minimum value to the current value (or between two thumbs in range mode),
 *  helping users see how much of the range is selected. */
export const SliderProgress: FC<PropsWithChildren<SliderProgressProps>> = ({ children, ...props }) => {
  const { value, disabled, orientation } = useSliderContext()

  return (
    <SliderBaseProgress from={0} to={value} orientation={orientation} disabled={disabled} {...props}>
      {children}
    </SliderBaseProgress>
  )
}