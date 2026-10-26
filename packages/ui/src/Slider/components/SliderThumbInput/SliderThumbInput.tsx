'use client';

import { ChangeEvent, FC, InputHTMLAttributes, KeyboardEvent, Ref } from 'react';
import { addWithPrecision, csx, mergeEventHandlers, snapToStep } from '@vega-ui/utils';
import { useSliderContext, useSliderThumbContext } from '../../contexts';
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
  onChange: _onChange,
  onKeyDown: _onKeyDown,
  ...props
}) => {
  const { min, max, step, orientation, disabled: _disabled, name: _name, values, changeThumb } = useSliderContext()
  const { index, low, high } = useSliderThumbContext()

  const value = values[index]

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeThumb(index, event.target.valueAsNumber)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const arrowStep = step === 'any' ? (max - min) / 100 : step
    const pageStep = Math.max(arrowStep, (max - min) / 10)

    let delta = 0
    if (event.key === 'PageUp') delta = pageStep
    if (event.key === 'PageDown') delta = -pageStep
    if (orientation === 'vertical' && event.key === 'ArrowRight') delta = arrowStep
    if (orientation === 'vertical' && event.key === 'ArrowLeft') delta = -arrowStep
    if (delta === 0) return

    event.preventDefault()
    changeThumb(index, snapToStep(addWithPrecision(value, delta), { min, max, step }))
  }

  return (
    <input
      className={csx(style.input, className)}
      type='range'
      min={low}
      max={high}
      step={step}
      value={value}
      disabled={disabled ?? _disabled}
      name={name ?? _name}
      aria-orientation={orientation}
      onChange={mergeEventHandlers(onChange, _onChange)}
      onKeyDown={mergeEventHandlers(onKeyDown, _onKeyDown)}
      {...props}
    />
  )
}
