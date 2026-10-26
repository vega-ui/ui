'use client';

import { CSSProperties, HTMLAttributes, Ref, useRef } from 'react';
import { clamp, csx, mergeRefs, snapToStep } from '@vega-ui/utils';
import { useControlledState, useFormReset } from '@vega-ui/hooks';
import { SliderProvider } from './contexts';
import { orderValues, getPosition, getThumbBounds } from './helpers';
import { SliderOrientation, SliderSize, SliderVariant } from './types';
import style from './style.module.css'

export interface SliderProps<V extends number | number[] = number> extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /**
   * Controlled value: a number for one thumb, or an array with one entry
   * per `SliderThumb` by its `index`.
   */
  value?: V

  /**
   * Initial value for uncontrolled usage: a number for one thumb, or an array
   * with one entry per `SliderThumb` by its `index`. Defaults to the middle of
   * the range, like `<input type="range">`.
   */
  defaultValue?: V

  /**
   * Called when a thumb changes, with a number or an array, in the shape of
   * `value` or `defaultValue`.
   */
  onChangeValue?(value: NoInfer<V>): void

  /**
   * The minimum allowed value. Defaults to `0`.
   */
  min?: number

  /**
   * The maximum allowed value. Defaults to `100`.
   */
  max?: number

  /**
   * The granularity of the values, a number or `'any'`. Defaults to `1`.
   */
  step?: number | 'any'

  /**
   * The minimum distance between neighbouring thumbs, in steps. Defaults to `0`.
   * Has no effect with `step='any'`, which has no step to count; use a small
   * numeric step such as `0.01` to keep a gap.
   */
  minStepsBetweenThumbs?: number

  /**
   * `'horizontal'` (default) or `'vertical'`, which grows from the bottom.
   */
  orientation?: SliderOrientation

  /**
   * Visual size of the slider.
   */
  size?: SliderSize

  /**
   * Visual styling variant.
   */
  variant?: SliderVariant

  /**
   * Disables all thumbs.
   */
  disabled?: boolean

  /**
   * Form field name of the thumbs, unless a thumb sets its own.
   */
  name?: string

  /**
   * Ref to the root element.
   */
  ref?: Ref<HTMLDivElement>
}

/** Slider lets users pick one or several numbers from a range by dragging thumbs along a track.
 *  Each `SliderThumb` is a native `<input type="range">` limited by its neighbors, so keyboard,
 *  form submission, and assistive technologies work as with the native element. */
export const Slider = <V extends number | number[] = number>({
  className,
  value,
  defaultValue,
  onChangeValue,
  min = 0,
  max = 100,
  step = 1,
  minStepsBetweenThumbs = 0,
  orientation = 'horizontal',
  size = 'md',
  variant = 'primary',
  disabled,
  name,
  style: cssStyle,
  ref,
  children,
  ...props
}: SliderProps<V>) => {
  const rootRef = useRef<HTMLDivElement>(null)

  const initialValue = defaultValue ?? (max < min ? min : snapToStep(min + (max - min) / 2, { min, max, step })) as V
  const [current, setCurrent] = useControlledState(value, initialValue, onChangeValue)

  const gap = step === 'any' ? 0 : minStepsBetweenThumbs * step

  const currentValues: number[] = Array.isArray(current) ? current : [current as number]
  const snappedValues = currentValues.map((value) => snapToStep(value, { min, max, step }))
  const values = orderValues(snappedValues, { min, max, gap })
  const setValues = (next: number[]) => setCurrent((Array.isArray(current) ? next : next[0]) as V)

  const changeThumb = (index: number, next: number) => {
    const [low, high] = getThumbBounds(values, index, { min, max, gap })
    const clamped = clamp(low, next, high)
    if (clamped === values[index]) return

    setValues(values.map((current, i) => (i === index ? clamped : current)))
  }

  useFormReset(rootRef, () => {
    if (value !== undefined) return
    setCurrent(initialValue)
  })

  return (
    <SliderProvider
      min={min}
      max={max}
      step={step}
      gap={gap}
      orientation={orientation}
      disabled={disabled}
      name={name}
      values={values}
      changeThumb={changeThumb}
    >
      <div
        className={csx(style.slider, className)}
        data-size={size}
        data-variant={variant}
        data-orientation={orientation}
        data-disabled={Boolean(disabled)}
        ref={mergeRefs([rootRef, ref])}
        style={{
          '--slider-range-start': values.length > 1 ? getPosition(values[0], min, max) : 0,
          '--slider-range-end': getPosition(values.at(-1) ?? min, min, max),
          ...cssStyle,
        } as CSSProperties}
        {...props}
      >
        {children}
      </div>
    </SliderProvider>
  )
}
