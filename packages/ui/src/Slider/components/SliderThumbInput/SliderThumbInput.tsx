'use client';

import { FC, InputHTMLAttributes, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { csx } from '@vega-ui/utils';
import { useOutput } from '../../../internals/widget';
import { useSliderContext, useSliderThumbContext } from '../../contexts';
import { sliderWidget, thumbPart } from '@vega-ui/widgets/slider';
import style from './style.module.css'

export interface SliderThumbInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'min' | 'max' | 'step' | 'value' | 'defaultValue'> {
  /**
   * Ref to the native `<input type="range">`.
   */
  ref?: Ref<HTMLInputElement>
}

/** SliderThumbInput is the native `<input type="range">` of a `SliderThumb`, limited by the
 *  neighboring thumbs. Keyboard, focus, form submission, and accessibility come from it. */
export const SliderThumbInput: FC<SliderThumbInputProps> = ({
  className,
  disabled,
  name,
  ref,
  ...props
}) => {
  const { disabled: _disabled, name: _name, handle } = useSliderContext()
  const { index } = useSliderThumbContext()
  const attrs = useOutput(handle, sliderWidget.output.input, index)
  const mergedRef = useMergeRefs([handle.rootAt(thumbPart(index)), ref])

  return (
    <input
      className={csx(style.input, className)}
      type='range'
      disabled={disabled ?? _disabled}
      name={name ?? _name}
      ref={mergedRef}
      {...handle.listen(attrs, props)}
    />
  )
}
