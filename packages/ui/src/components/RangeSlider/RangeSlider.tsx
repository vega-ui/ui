import {
  FC,
  HTMLAttributes,
  PointerEvent,
  MouseEvent,
  useState,
  useRef,
  KeyboardEvent,
  PropsWithChildren,
} from 'react';

import { useControlledState } from '@vega-ui/hooks';
import { SliderBase } from '../SliderBase';
import { clamp } from '@vega-ui/utils';
import { RangeSliderProvider } from './providers';

export interface RangeSliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /**
   * Controlled value for the slider, as a tuple [min, max].
   */
  value?: [number, number]

  /**
   * Uncontrolled initial value for the slider, as a readonly tuple.
   */
  defaultValue?: readonly [number, number]

  /**
   * Maximum allowed value.
   * Defaults to 100.
   */
  max?: number

  /**
   * Minimum allowed value.
   * Defaults to 0.
   */
  min?: number

  /**
   * Step between values.
   * Use `'any'` for no snapping.
   */
  step?: number | 'any'

  /**
   * Layout direction: horizontal (default) or vertical.
   */
  orientation?: 'vertical' | 'horizontal'

  /**
   * Custom class name for the root element.
   */
  className?: string

  /**
   * Size of the slider visuals (thumb, track, etc).
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Minimum distance allowed between thumbs.
   */
  minRange?: number

  /**
   * Prevents the thumbs from skipping over each other in a single gesture.
   */
  preventSkip?: boolean

  /**
   * Called when either thumb value changes.
   */
  onChange?(e: PointerEvent | KeyboardEvent, value: [number, number]): void

  /**
   * Whether the entire slider is disabled.
   */
  disabled?: boolean
}


/** RangeSlider is a UI component that lets users select a numeric range using two draggable thumbs.
 *  It’s useful for filters, pricing sliders, or any case where a start and end value need to be chosen. */
export const RangeSlider: FC<PropsWithChildren<RangeSliderProps>> = ({
  value: controlledValue,
  orientation = 'horizontal',
  disabled,
  min = 0,
  max = 100,
  size,
  step = 1,
  minRange = 0,
  preventSkip = true,
  children,
  onChange,
  defaultValue,
  ...props
}) => {
  const defaultSliderValue = defaultValue ? defaultValue : [min, max] as const

  const sliderRef = useRef<HTMLDivElement>(null)

  const [dragging, setDragging] = useState(false)
  const [value, setValue] = useControlledState(controlledValue, defaultSliderValue)
  const [activeIndex, setActiveIndex] = useState<number>()

  const changeValue = (index: number, newValue: number) => {
    if (disabled || value[index] === newValue) return

    const cloned = [...value] as [number, number]
    cloned[index] = newValue

    if (Math.abs(cloned[0] - cloned[1]) < minRange) {
      if (index === 1 && newValue < value[1]) cloned[index] = cloned[0] + minRange
      if (index === 0 && newValue > value[0]) cloned[index] = cloned[1] - minRange
    }

    if (cloned[1] < cloned[0]) return

    setValue(cloned)

    return cloned
  }

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

  const getClosestIndex = (e: PointerEvent) => {
    const val = calcValue(e)

    const lengths = [Math.abs(value[0] - val), Math.abs(value[1] - val)]

    if (lengths[0] < lengths[1]) return 0
    if (lengths[1] < lengths[0]) return 1
    if (lengths[0] === lengths[1]) {
      if (val < value[0]) return 0
      if (val > value[1]) return 1
    }

    return null
  }

  const getIndex = (e: PointerEvent) => {
    const element = e.target as HTMLElement

    const dataIndex = Number(element.dataset.index)
    const closestIndex = getClosestIndex(e)

    if (isNaN(dataIndex)) return closestIndex

    return dataIndex
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const val = calcValue(e)

    const element = e.target as HTMLElement
    element?.setPointerCapture(e.pointerId)

    const index = getIndex(e)
    if (index == null) return

    setActiveIndex(index)

    const newValues = changeValue(index, val)
    if (newValues) onChange?.(e, newValues)

    setDragging(true)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return

    const val = calcValue(e)

    if (value[0] === value[1]) {
      let index = getIndex(e)
      if (index === null) return

      if (val < value[0]) index = 0;
      if (val > value[1]) index = 1;

      setActiveIndex(index)
    }

    if (activeIndex === undefined) return;

    const newValues = changeValue(activeIndex, val)

    if (newValues) onChange?.(e, newValues)
    if (newValues && newValues[0] === newValues[1] && value[activeIndex] !== val && preventSkip) {
      setDragging(false)
      return
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const element = e.target as HTMLElement

    const formattedStep = step === 'any' ? 1 : step
    const index = Number(element.dataset.index)

    if (isNaN(index)) return

    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
      const val = ['ArrowDown', 'ArrowLeft'].includes(e.key) ? value[index] - formattedStep : value[index] + formattedStep

      if (index === 0 && val > value[1]) return
      if (index === 1 && val < value[0]) return
      if (val >= min) {
        const newValues = changeValue(index, val)
        if (newValues) onChange?.(e, newValues)
      }

      return
    }

    if (['Home', 'End'].includes(e.key)) {
      e.preventDefault()

      const val = e.key === 'Home'
        ? index === 0 ? min : value[0]
        : index === 1 ? max : value[1]

      const newValues = changeValue(index, val)
      if (newValues) onChange?.(e, newValues)

      return
    }
  }

  return (
    <RangeSliderProvider minRange={minRange} min={min} max={max} value={value} step={step} size={size} orientation={orientation}>
      <SliderBase
        disabled={disabled}
        orientation={orientation}
        ref={sliderRef}
        size={size}
        min={min}
        max={max}
        onPointerUp={() => {
          setDragging(false)
        }}
        onMouseUp={() => {
          setDragging(false)
        }}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        {...props}
      >
        {children}
      </SliderBase>
    </RangeSliderProvider>
  );
}