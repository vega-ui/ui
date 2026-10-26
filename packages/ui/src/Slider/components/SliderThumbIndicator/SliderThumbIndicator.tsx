'use client';

import { FC, HTMLAttributes, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { useSliderContext } from '../../contexts';
import style from './style.module.css'

export interface SliderThumbIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Ref to the indicator element.
   */
  ref?: Ref<HTMLDivElement>
}

/** SliderThumbIndicator is the visual handle of a `SliderThumb`, drawn at its value. It is
 *  hidden from assistive technologies and lets the pointer through to the native input,
 *  so it may contain any content. */
export const SliderThumbIndicator: FC<SliderThumbIndicatorProps> = ({ className, ...props }) => {
  const { orientation } = useSliderContext()

  return (
    <div
      className={csx(style.indicator, className)}
      data-orientation={orientation}
      aria-hidden
      {...props}
    />
  )
}
