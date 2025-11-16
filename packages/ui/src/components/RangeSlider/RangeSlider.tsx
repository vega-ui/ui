import {
  FC,
  HTMLAttributes,
  PointerEvent,
  MouseEvent,
  useRef,
  KeyboardEvent,
  PropsWithChildren,
} from 'react';

import { useControlledState } from '@vega-ui/hooks';
import { SliderBase } from '../SliderBase';
import { clamp } from '@vega-ui/utils';
import { RangeSliderProvider } from './providers';
import { RangeSliderSize } from './types';

export interface RangeSliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /**
   * Controlled value for the slider, as a tuple [min, max].
   */
  value?: [number, number]

  /**
   * Uncontrolled initial value for the slider.
   */
  defaultValue?: [number, number]

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
  size?: RangeSliderSize

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
  const sliderRef = useRef<HTMLDivElement>(null)

  const index = useRef<number>(null)
  const [value, setValue] = useControlledState<[number, number]>(controlledValue, defaultValue ?? [min, max])

  const changeValue = (index: number, val: number) => {
    const current = value[index];
    if (disabled || current === val) return
    
    let changed = [...value] as [number, number]
    
    if (index === 0 && val > value[1]) changed = [value[1], val]
    else if (index === 1 && val < value[0]) changed = [val, value[0]]
    else changed[index] = val
    
    if (Math.abs(changed[0] - changed[1]) < minRange) {
      if (index === 1 && val < value[1]) changed[index] = changed[0] + minRange
      if (index === 0 && val > value[0]) changed[index] = changed[1] - minRange
    }
    
    setValue(changed)
    return changed
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

    const index = Number(element.dataset.index)
    if (isNaN(index)) return getClosestIndex(e)

    return index
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const element = e.target as HTMLElement
    if (!element) return
    
    const pointedIndex = getIndex(e)
    if (pointedIndex === null) return
    
    element.setPointerCapture(e.pointerId)
    index.current = pointedIndex

    const newValues = changeValue(pointedIndex, calcValue(e))
    if (newValues) onChange?.(e, newValues)
  }
  
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (index.current === null) return

    const val = calcValue(e)
    
    const newValues = changeValue(index.current, val)
    
    if (val < value[0] && index.current !== 0) index.current = 0;
    if (val > value[1] && index.current !== 1) index.current = 1;
    
    if (!newValues) return

    onChange?.(e, newValues)
    if (newValues[0] === newValues[1] && value[index.current] !== val && preventSkip) {
      index.current = null;
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
  
  const onPointerUp = () => {
    index.current = null;
  }

  return (
    <RangeSliderProvider
      minRange={minRange}
      min={min}
      max={max}
      value={value}
      step={step}
      size={size}
      orientation={orientation}
    >
      <SliderBase
        disabled={disabled}
        orientation={orientation}
        ref={sliderRef}
        size={size}
        min={min}
        max={max}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        {...props}
      >
        {children}
      </SliderBase>
    </RangeSliderProvider>
  );
}