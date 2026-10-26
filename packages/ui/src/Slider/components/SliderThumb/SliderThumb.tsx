'use client';

import { CSSProperties, FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { SliderThumbProvider, useSliderContext } from '../../contexts';
import { getPosition, getThumbBounds } from '../../helpers';
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
  const { min, max, gap, values } = useSliderContext()
  const [low, high] = getThumbBounds(values, index, { min, max, gap })

  const value = values[index]
  const previous = values[index - 1]
  const next = values[index + 1]

  const span = high - low
  const clip = (length: number) => {
    const fraction = span === 0 ? 0 : length / span
    return `calc(var(--slider-thumb-size) / 2 + ${fraction} * (100% - var(--slider-thumb-size)))`
  }

  return (
    <SliderThumbProvider index={index} low={low} high={high}>
      <div
        data-slider-thumb
        className={csx(style.thumb, className)}
        style={{
          '--slider-thumb-position': getPosition(value, min, max),
          '--slider-thumb-start': getPosition(low, min, max),
          '--slider-thumb-end': getPosition(high, min, max),
          '--slider-thumb-clip-start': previous === undefined ? '0px' : clip((previous + value) / 2 - low),
          '--slider-thumb-clip-end': next === undefined ? '0px' : clip(high - (value + next) / 2),
          ...cssStyle,
        } as CSSProperties}
        {...props}
      />
    </SliderThumbProvider>
  )
}
