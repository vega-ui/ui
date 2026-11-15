import { act, browser, controlled, defineWidget, emptyCollection, handled, Input, keep, key, listening, nav, state, text } from '@vega-ui/core'
import { addWithPrecision, clamp, snapToStep } from '@vega-ui/utils'
import { getPosition } from './getPosition'
import { getThumbBounds } from './getThumbBounds'
import { orderValues } from './orderValues'

const THUMB = 'thumb-'

const THUMBS = emptyCollection<number>()

export const sliderShape = state({
  options: {
    min: 0,
    max: 100,
    step: 1 as number | 'any',
    gap: 0,
    orientation: 'horizontal' as 'horizontal' | 'vertical',
  },
  owns: { value: controlled<number | number[]>(0) },
  collection: () => THUMBS,
})

type SliderSnapshot = typeof sliderShape.__snapshot

interface SliderRange {
  readonly min: number
  readonly max: number
  readonly step: number | 'any'
  readonly gap: number
}

/**
 * Returns the name of the root of the thumb at `index`.
 */
export const thumbPart = (index: number) => `${THUMB}${index}`

/**
 * Returns the values of the thumbs: snapped to the step, sorted and kept
 * `gap` apart within `min` and `max`.
 */
export const valuesOf = (value: number | number[], { min, max, step, gap }: SliderRange) => {
  const values = Array.isArray(value) ? value : [value]

  return orderValues(values.map((entry) => snapToStep(entry, { min, max, step })), { min, max, gap })
}

const indexOf = (part: string | undefined) => {
  if (!part?.startsWith(THUMB)) return undefined

  return Number(part.slice(THUMB.length))
}

const changed = (state: SliderSnapshot, index: number, next: number) => {
  const values = valuesOf(state.value, state.options)
  const [low, high] = getThumbBounds(values, index, state.options)
  const clamped = clamp(low, next, high)
  if (clamped === values[index]) return state

  const changedValues = values.map((value, position) => (position === index ? clamped : value))

  return sliderShape.value.set(state, Array.isArray(state.value) ? changedValues : changedValues[0])
}

const INCREASING = { horizontal: [nav.forward, key.arrowUp], vertical: [nav.backward, key.arrowRight] }
const DECREASING = { horizontal: [nav.backward, key.arrowDown], vertical: [nav.forward, key.arrowLeft] }

const deltaOf = (state: SliderSnapshot, input: Input) => {
  const { min, max, step, orientation } = state.options
  const arrowStep = step === 'any' ? (max - min) / 100 : step
  const pageStep = Math.max(arrowStep, (max - min) / 10)

  if (input.is(nav.pageBackward)) return pageStep
  if (input.is(nav.pageForward)) return -pageStep
  if (INCREASING[orientation].some((spec) => input.is(spec))) return arrowStep
  if (DECREASING[orientation].some((spec) => input.is(spec))) return -arrowStep

  return undefined
}

const changing = listening<SliderSnapshot>([text.change], (state, input) => {
  const index = indexOf(input.part)
  if (!input.is(text.change) || !input.field || index === undefined) return undefined

  return keep(changed(state, index, Number(input.field.value)))
})

const stepping = listening<SliderSnapshot>([nav.pageBackward, nav.pageForward, nav.forward, nav.backward, key.arrowUp, key.arrowDown, key.arrowRight, key.arrowLeft], (state, input) => {
  const index = indexOf(input.part)
  const delta = deltaOf(state, input)
  if (index === undefined || delta === undefined) return undefined

  const { min, max, step } = state.options
  const value = valuesOf(state.value, state.options)[index]
  const next = changed(state, index, snapToStep(addWithPrecision(value, delta), { min, max, step }))

  return handled(next, [act.commitText(thumbPart(index), String(valuesOf(next.value, next.options)[index]))])
})

const resetting = listening<SliderSnapshot>([browser.reset], (state, input) => {
  if (!input.is(browser.reset) || sliderShape.value.controlled(state)) return undefined

  return keep(sliderShape.value.set(state, state.options.defaultValue ?? 0))
})

const thumbOf = (value: number | number[], options: SliderSnapshot['options'], index: number) => {
  const values = valuesOf(value, options)
  const [low, high] = getThumbBounds(values, index, options)

  return { values, low, high }
}

const clipOf = (length: number, low: number, high: number) => {
  const span = high - low
  const fraction = span === 0 ? 0 : length / span

  return `calc(var(--slider-thumb-size) / 2 + ${fraction} * (100% - var(--slider-thumb-size)))`
}

export const sliderWidget = defineWidget({
  state: sliderShape,

  step: [changing, stepping, resetting],

  output: {
    root: sliderShape.part(
      (state) => [state.value, state.options] as const,
      ([value, options]) => {
        const { min, max } = options
        const values = valuesOf(value, options)

        return {
          style: {
            '--slider-range-start': values.length > 1 ? getPosition(values[0], min, max) : 0,
            '--slider-range-end': getPosition(values[values.length - 1] ?? min, min, max),
          },
        }
      },
    ),
    thumb: sliderShape.part(
      (state, index) => [state.value, state.options, index] as const,
      ([value, options, index]) => {
        const { min, max } = options
        const { values, low, high } = thumbOf(value, options, index)
        const previous = values[index - 1]
        const next = values[index + 1]
        const current = values[index]

        return {
          style: {
            '--slider-thumb-position': getPosition(current, min, max),
            '--slider-thumb-start': getPosition(low, min, max),
            '--slider-thumb-end': getPosition(high, min, max),
            '--slider-thumb-clip-start': previous === undefined ? '0px' : clipOf((previous + current) / 2 - low, low, high),
            '--slider-thumb-clip-end': next === undefined ? '0px' : clipOf(high - (current + next) / 2, low, high),
          },
        }
      },
    ),
    input: sliderShape.part(
      (state, index) => [state.value, state.options, index] as const,
      ([value, options, index]) => {
        const { values, low, high } = thumbOf(value, options, index)

        return { min: low, max: high, step: options.step, value: values[index], 'aria-orientation': options.orientation }
      },
    ),
  },
})
