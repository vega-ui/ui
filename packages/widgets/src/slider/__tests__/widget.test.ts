import { describe, expect, it, vi } from 'vitest'
import { act, browser, key, lifecycle, text } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { sliderWidget, thumbPart, valuesOf } from '../widget'

type SliderOptions = Parameters<typeof simulate<typeof sliderWidget.shape>>[1]

const options = (overrides: Partial<SliderOptions> = {}): SliderOptions => ({ min: 0, max: 100, step: 1, gap: 0, orientation: 'horizontal', defaultValue: 50, ...overrides })

const simulateSlider = (overrides: Partial<SliderOptions> = {}, rtl = false) => {
  const settings = options(overrides)

  return simulate(sliderWidget, settings, { orientation: settings.orientation, rtl }).send(lifecycle.connect)
}

const onThumb = (index: number) => ({ part: thumbPart(index) })

const changedTo = (index: number, value: number) => ({ ...onThumb(index), field: { value: String(value), selection: [0, 0] as const } })

type SliderState = ReturnType<typeof simulateSlider>['state']

const { root, thumb, input } = sliderWidget.output

const rootOf = (state: SliderState) => root.render(root.select(state, undefined as never))

const thumbOf = (state: SliderState, index: number) => thumb.render(thumb.select(state, index))

const inputOf = (state: SliderState, index: number) => input.render(input.select(state, index))

describe('Critical User Paths', () => {
  it('steps a horizontal thumb with the arrows, writes its input and reports the value', () => {
    const onChangeValue = vi.fn()
    const slider = simulateSlider({ step: 5, onChangeValue })

    slider.send(key.arrowRight, onThumb(0))
    expect(slider.state.value).toBe(55)
    expect(slider.answer).toBe('handled')
    expect(slider.actions).toEqual([act.commitText(thumbPart(0), '55')])
    expect(onChangeValue).toHaveBeenLastCalledWith(55)

    slider.send(key.arrowUp, onThumb(0))
    expect(slider.state.value).toBe(60)

    slider.send(key.arrowLeft, onThumb(0)).send(key.arrowDown, onThumb(0)).send(key.arrowDown, onThumb(0))
    expect(slider.state.value).toBe(45)
  })

  it('pages by a tenth of the range, or by the step when it is larger', () => {
    const slider = simulateSlider()

    slider.send(key.pageUp, onThumb(0))
    expect(slider.state.value).toBe(60)

    slider.send(key.pageDown, onThumb(0)).send(key.pageDown, onThumb(0))
    expect(slider.state.value).toBe(40)

    expect(simulateSlider({ step: 25 }).send(key.pageUp, onThumb(0)).state.value).toBe(75)
    expect(simulateSlider({ step: 3, defaultValue: 51 }).send(key.pageUp, onThumb(0)).state.value).toBe(60)
  })

  it('moves a thumb of a range to the native value and keeps the thumbs the gap apart', () => {
    const onChangeValue = vi.fn()
    const slider = simulateSlider({ defaultValue: [20, 60], gap: 10, onChangeValue })

    slider.send(text.change, changedTo(1, 40))
    expect(slider.state.value).toEqual([20, 40])
    expect(onChangeValue).toHaveBeenLastCalledWith([20, 40])

    slider.send(text.change, changedTo(0, 45))
    expect(slider.state.value).toEqual([30, 40])

    slider.send(key.arrowRight, onThumb(0))
    expect(slider.state.value).toEqual([30, 40])
    expect(slider.actions).toEqual([act.commitText(thumbPart(0), '30')])
  })

  it('fills the range between the first and the last thumbs, or from min to a single thumb', () => {
    expect(rootOf(simulateSlider({ defaultValue: [20, 80] }).state)).toEqual({ style: { '--slider-range-start': 0.2, '--slider-range-end': 0.8 } })
    expect(rootOf(simulateSlider({ defaultValue: [30] }).state)).toEqual({ style: { '--slider-range-start': 0, '--slider-range-end': 0.3 } })
  })

  it('lays each thumb input over the track between its neighbours and cuts it at the midpoints', () => {
    const { state } = simulateSlider({ defaultValue: [10, 45, 90] })

    expect(inputOf(state, 1)).toEqual({ min: 10, max: 90, step: 1, value: 45, 'aria-orientation': 'horizontal' })
    expect(thumbOf(state, 1)).toEqual({
      style: {
        '--slider-thumb-position': 0.45,
        '--slider-thumb-start': 0.1,
        '--slider-thumb-end': 0.9,
        '--slider-thumb-clip-start': 'calc(var(--slider-thumb-size) / 2 + 0.21875 * (100% - var(--slider-thumb-size)))',
        '--slider-thumb-clip-end': 'calc(var(--slider-thumb-size) / 2 + 0.28125 * (100% - var(--slider-thumb-size)))',
      },
    })
    expect(thumbOf(state, 0)).toMatchObject({ style: { '--slider-thumb-start': 0, '--slider-thumb-clip-start': '0px' } })
    expect(thumbOf(state, 2)).toMatchObject({ style: { '--slider-thumb-end': 1, '--slider-thumb-clip-end': '0px' } })
  })
})

describe('Edge Cases', () => {
  it('snaps the values to the step grid, keeps them on the track and sorts them', () => {
    const range = { min: 0, max: 100, step: 1, gap: 0 }

    expect(valuesOf(150, range)).toEqual([100])
    expect(valuesOf([2.5, 7], { ...range, max: 10 })).toEqual([3, 7])
    expect(valuesOf([15, 50], { ...range, step: 10 })).toEqual([20, 50])
    expect(valuesOf([80, 20], range)).toEqual([20, 80])
  })

  it('increases a vertical thumb with Up and Right and decreases it with Down and Left', () => {
    const slider = simulateSlider({ orientation: 'vertical' })

    slider.send(key.arrowUp, onThumb(0)).send(key.arrowRight, onThumb(0))
    expect(slider.state.value).toBe(52)

    slider.send(key.arrowDown, onThumb(0)).send(key.arrowDown, onThumb(0)).send(key.arrowLeft, onThumb(0))
    expect(slider.state.value).toBe(49)
  })

  it('increases a horizontal thumb with Left in a right-to-left layout', () => {
    const slider = simulateSlider({}, true)

    slider.send(key.arrowLeft, onThumb(0))
    expect(slider.state.value).toBe(51)

    slider.send(key.arrowRight, onThumb(0)).send(key.arrowRight, onThumb(0))
    expect(slider.state.value).toBe(49)
  })

  it('stops at min and max without reporting', () => {
    const onChangeValue = vi.fn()
    const slider = simulateSlider({ defaultValue: 100, onChangeValue })

    slider.send(key.arrowRight, onThumb(0))
    expect(slider.state.value).toBe(100)
    expect(onChangeValue).not.toHaveBeenCalled()

    expect(simulateSlider({ defaultValue: 0 }).send(key.pageDown, onThumb(0)).state.value).toBe(0)

    simulateSlider({ defaultValue: [20, 100], onChangeValue }).send(key.arrowRight, onThumb(1))
    expect(onChangeValue).not.toHaveBeenCalled()
  })

  it('steps by a hundredth of the range with any step and by a fraction without floating point noise', () => {
    expect(simulateSlider({ step: 'any', max: 10, defaultValue: 5 }).send(key.arrowRight, onThumb(0)).state.value).toBe(5.1)
    expect(simulateSlider({ step: 'any', max: 1, defaultValue: 0.06 }).send(key.arrowRight, onThumb(0)).state.value).toBe(0.07)
    expect(simulateSlider({ step: 0.1, max: 1, defaultValue: 0.2 }).send(key.arrowRight, onThumb(0)).state.value).toBe(0.3)
  })

  it('reports a controlled value and keeps the parent one until the parent takes the new one', () => {
    const onChangeValue = vi.fn()
    const slider = simulateSlider({ value: 50, onChangeValue })

    slider.send(key.arrowRight, onThumb(0))
    expect(onChangeValue).toHaveBeenLastCalledWith(51)

    slider.setOptions(options({ value: 50, onChangeValue }))
    expect(slider.state.value).toBe(50)

    slider.setOptions(options({ value: 51, onChangeValue }))
    expect(slider.state.value).toBe(51)
    expect(onChangeValue).toHaveBeenCalledTimes(1)
  })

  it('puts the thumb at the start when max is below min', () => {
    const { state } = simulateSlider({ min: 10, max: 0, defaultValue: 10 })

    expect(inputOf(state, 0)).toMatchObject({ value: 10 })
    expect(thumbOf(state, 0)).toMatchObject({ style: { '--slider-thumb-position': 0 } })
  })

  it('cuts stacked thumbs at their centre, also when one has no track left', () => {
    const { state } = simulateSlider({ defaultValue: [100, 100] })
    const centre = 'calc(var(--slider-thumb-size) / 2 + 0 * (100% - var(--slider-thumb-size)))'

    expect(thumbOf(state, 0)).toMatchObject({ style: { '--slider-thumb-start': 0, '--slider-thumb-end': 1, '--slider-thumb-clip-end': centre } })
    expect(thumbOf(state, 1)).toMatchObject({ style: { '--slider-thumb-start': 1, '--slider-thumb-end': 1, '--slider-thumb-clip-start': centre } })
  })

  it('restores the default value on a form reset unless the parent controls it', () => {
    const slider = simulateSlider({ defaultValue: [20, 60] })

    slider.send(text.change, changedTo(0, 40)).send(browser.reset)
    expect(slider.state.value).toEqual([20, 60])

    expect(simulateSlider({ value: 50 }).send(browser.reset).answer).toBe('pass')
  })
})

describe('Accessibility', () => {
  it('gives every thumb input the orientation of the slider', () => {
    expect(inputOf(simulateSlider({ orientation: 'vertical' }).state, 0)).toMatchObject({ 'aria-orientation': 'vertical' })
  })
})
