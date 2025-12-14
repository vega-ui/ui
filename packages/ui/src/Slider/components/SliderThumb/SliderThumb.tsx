'use client';

import { FC } from 'react';
import { useSliderContext } from '../../contexts';
import { SliderBaseThumb, SliderBaseThumbProps } from '../../../SliderBase';

export type SliderThumbProps = SliderBaseThumbProps

/** SliderThumb is the interactive handle of a slider component that users can click and drag to select a specific value.
 *  Positioned along the track based on the current value, it reflects user input and provides visual feedback.
 *  The component supports keyboard navigation, orientation-aware positioning (horizontal or vertical),
 *  and is styled according to size, variant, and disabled state.
 *  Used inside `Slider`, it enables accessible and precise value manipulation. */
export const SliderThumb: FC<SliderThumbProps> = ({ name, id, className, ...props }) => {
  const { orientation, disabled } = useSliderContext()

  return (
    <SliderBaseThumb
      className={className}
      name={name}
      id={id}
      orientation={orientation}
      disabled={disabled}
      {...props}
    />
  )
}