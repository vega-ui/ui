import { FC } from 'react';
import { SliderBaseHiddenInput, SliderBaseHiddenInputProps } from '../../../SliderBase';
import { useRangeSliderContext, useRangeSliderThumbContext } from '../../contexts';

export type RangeSliderHiddenInputProps = SliderBaseHiddenInputProps

/**
 * RangeSliderHiddenInput
 *
 * A visually hidden native `<input type="range">` used to connect an individual
 * `RangeSlider` thumb with native form behavior and accessibility features.
 *
 * Purpose:
 * - Provides a form-associated control for each slider thumb
 * - Enables native form submission
 */
export const RangeSliderHiddenInput: FC<RangeSliderHiddenInputProps> = ({ ...props }) => {
  const { max, min, value } = useRangeSliderThumbContext()
  const { disabled, step } = useRangeSliderContext()
  
  return (
    <SliderBaseHiddenInput
      step={step}
      value={value}
      min={min}
      max={max}
      disabled={disabled}
      {...props}
    />
  )
}