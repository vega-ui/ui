'use client';

import { FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { useSliderContext } from '../../contexts';
import style from './style.module.css'

export interface SliderTrackProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref to the track element. */
  ref?: Ref<HTMLDivElement>
}

/** SliderTrack is the rail of a `Slider` along which the thumbs move. Place `SliderRange` inside it. */
export const SliderTrack: FC<SliderTrackProps> = ({ className, ...props }) => {
  const { orientation } = useSliderContext()

  return <div className={csx(style.track, className)} data-orientation={orientation} {...props} />
}
