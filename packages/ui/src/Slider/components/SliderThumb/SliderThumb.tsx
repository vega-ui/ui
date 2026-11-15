'use client';

import { FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { useOutput } from '../../../internals/widget';
import { SliderThumbProvider, useSliderContext } from '../../contexts';
import { getThumbBounds, sliderWidget } from '@vega-ui/widgets/slider';
import style from './style.module.css'

export interface SliderThumbProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Position of the thumb among the thumbs of the `Slider`, its entry of the
   * root `value`. Defaults to `0`.
   */
  index?: number

  /**
   * Ref to the thumb element.
   */
  ref?: Ref<HTMLDivElement>
}

/** SliderThumb is a handle of a `Slider`. It groups a `SliderThumbInput`, the native
 *  `<input type="range">` laid over the track between its neighbors, and a
 *  `SliderThumbIndicator` drawn at its value. */
export const SliderThumb: FC<SliderThumbProps> = ({ index = 0, className, style: cssStyle, ...props }) => {
  const { min, max, gap, values, handle } = useSliderContext()
  const [low, high] = getThumbBounds(values, index, { min, max, gap })
  const attrs = useOutput(handle, sliderWidget.output.thumb, index)

  return (
    <SliderThumbProvider index={index} low={low} high={high}>
      <div
        data-slider-thumb
        className={csx(style.thumb, className)}
        {...handle.merge(attrs, { style: cssStyle, ...props })}
      />
    </SliderThumbProvider>
  )
}
