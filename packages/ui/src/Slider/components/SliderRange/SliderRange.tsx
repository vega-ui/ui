'use client';

import { FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { useSliderContext } from '../../contexts';
import style from './style.module.css'

export interface SliderRangeProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>
}

/** SliderRange fills the `SliderTrack` from `min` to the thumb, or between the first and the last thumbs. */
export const SliderRange: FC<SliderRangeProps> = ({ className, ...props }) => {
  const { orientation } = useSliderContext()

  return <div className={csx(style.range, className)} data-orientation={orientation} {...props} />
}
