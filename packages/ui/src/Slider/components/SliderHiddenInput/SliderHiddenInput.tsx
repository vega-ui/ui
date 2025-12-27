import { FC } from 'react';
import { SliderBaseHiddenInput, SliderBaseHiddenInputProps } from '../../../SliderBase';
import { useSliderContext } from '../../contexts';

export type SliderHiddenInputProps = SliderBaseHiddenInputProps

/**
 * SliderHiddenInput
 *
 * A visually hidden native `<input type="range">` used to connect an individual
 * `Slider` thumb with native form behavior and accessibility features.
 *
 * Purpose:
 * - Provides a form-associated control for each slider thumb
 * - Enables native form submission
 */
export const SliderHiddenInput: FC<SliderHiddenInputProps> = (props) => {
  const { step, value, max, disabled, min } = useSliderContext()
  return (
    <SliderBaseHiddenInput
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      value={value}
      {...props}
    />
  )
}