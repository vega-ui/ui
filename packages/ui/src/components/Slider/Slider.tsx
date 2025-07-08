import { FC, HTMLAttributes, PointerEvent, KeyboardEvent, MouseEvent, useRef, useState, useCallback } from 'react';

import { clamp } from '@vega-ui/utils';
import { useControlledState } from '@vega-ui/hooks';
import { SliderProvider } from './providers';
import { SliderBase } from '../SliderBase';

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Controlled value of the slider.
   * Takes precedence over `defaultValue` if provided.
   */
  value?: number

  /**
   * Initial value of the slider for uncontrolled usage.
   * Used only if `value` is not specified.
   */
  defaultValue?: number

  /**
   * Callback fired when the slider value changes.
   * Provides the original pointer, mouse, or keyboard event and the new numeric value.
   */
  onChange?: (
    e: PointerEvent<HTMLDivElement> | MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    value: number
  ) => void

  /**
   * The maximum allowed value for the slider.
   * Defaults to 100 if not specified.
   */
  max?: number

  /**
   * The minimum allowed value for the slider.
   * Defaults to 0 if not specified.
   */
  min?: number

  /**
   * The granularity with which the value can be incremented or decremented.
   * A number or `'any'` for unrestricted precision.
   */
  step?: number | 'any'

  /**
   * Orientation of the slider.
   * `'horizontal'` (default) or `'vertical'`.
   */
  orientation?: 'vertical' | 'horizontal'

  /**
   * Optional class name for applying custom styles to the root slider element.
   */
  className?: string

  /**
   * Visual size of the slider.
   */
  size?: 'sm' | 'md' | 'lg' | string

  /**
   * Whether the slider is disabled and non-interactive.
   */
  disabled?: boolean
}


/** Slider is a high-level UI component that allows users to select a numeric value from a defined range by dragging a thumb along a track.
 *  It combines visual and interactive elements such as the track, progress bar, and thumb, and supports various configurations like size, orientation, step precision, and accessibility.
 *  Commonly used for form inputs, media controls, settings, and data filtering, the Slider component can be either controlled or uncontrolled. */
export const Slider: FC<SliderProps> = ({
  className,
  min = 0,
  max = 100,
  step = 1,
  defaultValue: controlledDefaultValue,
  value: controlledValue,
  size = 'md',
  onChange,
  orientation = 'horizontal',
  disabled,
  children,
  ...props
}) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  const defaultValue = controlledDefaultValue ? controlledDefaultValue :max < min ? min : min + (max - min) / 2;

  const [value, setValue] = useControlledState(controlledValue, defaultValue)
  const [dragging, setDragging] = useState(false)

  const changeValue = useCallback((e: PointerEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>, newValue: number) => {
    if (disabled || newValue === value) return

    onChange?.(e, newValue)
    setValue(newValue)
  }, [])

  const calcValue = (e: PointerEvent | MouseEvent) => {
    const track = sliderRef.current
    if (!track) return min
    const rect = track.getBoundingClientRect()

    const percent = orientation === 'horizontal'
      ? (e.clientX - rect.left) / rect.width
      : 1 - (e.clientY - rect.top) / rect.height

    const raw = min + (max - min) * percent

    if (step === 'any') return clamp(min, raw, max)

    const snapped = Math.round(raw / step) * step
    return clamp(min, snapped, max)
  }

  const onSliderPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const val = calcValue(e)

    changeValue(e, val)

    const element = e.target as HTMLElement
    element?.setPointerCapture(e.pointerId)

    setDragging(true)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const formattedStep = step === 'any' ? 1 : step

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowLeft': {
        e.preventDefault()
        const nextValue = value - formattedStep
        if (nextValue >= min) changeValue?.(e, nextValue)
        return
      }
      case 'ArrowUp':
      case 'ArrowRight': {
        e.preventDefault()
        const nextValue = value + formattedStep
        if (nextValue <= max) changeValue?.(e, nextValue)
        return
      }
      case 'Home':
        e.preventDefault()
        changeValue?.(e, min)
        return
      case 'End':
        e.preventDefault()
        changeValue?.(e, max)
        return
    }
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return

    const val = calcValue(e)

    changeValue(e, val)
  }

  return (
    <SliderProvider
      orientation={orientation}
      step={step === 'any' ? 1 : step}
      min={min}
      max={max}
      value={value}
      disabled={disabled}
    >
      <SliderBase
        orientation={orientation}
        onPointerDown={onSliderPointerDown}
        onKeyDown={onKeyDown}
        onMouseUp={() => {
          setDragging(false)
        }}
        onPointerMove={onPointerMove}
        onPointerUp={() => {
          setDragging(false)
        }}
        ref={sliderRef}
        min={min}
        max={max}
        value={value}
        className={className}
        data-size={size}
        disabled={disabled}
        {...props}
      >
        {children}
      </SliderBase>
    </SliderProvider>
  );
}