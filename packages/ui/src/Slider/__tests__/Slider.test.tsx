import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { Slider } from '../Slider.tsx'
import { SliderThumb, SliderProgress, SliderHiddenInput } from '../components'

beforeEach(() => {
  Element.prototype.setPointerCapture = vi.fn()
})

describe('Slider', () => {
  describe('basic rendering and default behavior', () => {
    it('renders with default value and children', () => {
      render(
        <Slider defaultValue={50} data-testid='slider'>
          <SliderProgress data-testid='progress' />
          <SliderThumb data-testid='thumb'>
            <SliderHiddenInput />
          </SliderThumb>
        </Slider>
      )

      expect(screen.getByTestId('slider')).toBeDefined()
      expect(screen.getByTestId('progress')).toBeDefined()
      expect(screen.getByTestId('thumb')).toBeDefined()
    })
  })

  describe('pointer interaction', () => {
    it('triggers onChange on pointer events', () => {
      const onChange = vi.fn()
      render(
        <Slider onChangeValue={onChange} data-testid='slider'>
          <SliderProgress />
          <SliderThumb>
            <SliderHiddenInput />
          </SliderThumb>
        </Slider>
      )
      const slider = screen.getByTestId('slider')
      fireEvent.pointerDown(slider, { clientX: 100 })
      fireEvent.pointerMove(slider, { clientX: 150 })
      fireEvent.pointerUp(slider)

      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('keyboard interaction', () => {
    it('responds to arrow keys and home/end', () => {
      const onChange = vi.fn()
      render(
        <Slider value={50} onChangeValue={onChange} data-testid='slider'>
          <SliderThumb>
            <SliderHiddenInput />
          </SliderThumb>
          <SliderProgress />
        </Slider>
      )
      const slider = screen.getByTestId('slider')

      fireEvent.keyDown(slider, { key: 'ArrowRight' })
      fireEvent.keyDown(slider, { key: 'ArrowLeft' })
      fireEvent.keyDown(slider, { key: 'Home' })
      fireEvent.keyDown(slider, { key: 'End' })

      const values = onChange.mock.calls.map(([v]) => v)

      expect(values).toContain(0)
      expect(values).toContain(100)
    })
  })

  describe('step="any" behavior', () => {
    it('allows non-snapped value when using "any"', () => {
      const onChange = vi.fn()
      render(
        <Slider step='any' onChangeValue={onChange} data-testid='slider-any'>
          <SliderThumb>
            <SliderHiddenInput />
          </SliderThumb>
          <SliderProgress />
        </Slider>
      )

      const slider = screen.getByTestId('slider-any')
      fireEvent.pointerDown(slider, { clientX: 55 })
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('orientation = "vertical"', () => {
    it('handles pointer interaction in vertical mode', () => {
      const onChange = vi.fn()
      render(
        <Slider orientation='vertical' onChangeValue={onChange} data-testid='slider-vertical'>
          <SliderThumb>
            <SliderHiddenInput />
          </SliderThumb>
          <SliderProgress />
        </Slider>
      )

      const vertical = screen.getByTestId('slider-vertical')
      fireEvent.pointerDown(vertical, { clientY: 100 })
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('disabled state', () => {
    it('ignores pointer interaction when disabled', () => {
      const onChange = vi.fn()
      render(
        <Slider disabled onChangeValue={onChange} data-testid='slider-disabled'>
          <SliderThumb>
            <SliderHiddenInput />
          </SliderThumb>
          <SliderProgress />
        </Slider>
      )

      const disabled = screen.getByTestId('slider-disabled')
      fireEvent.pointerDown(disabled, { clientX: 100 })
      expect(onChange).not.toHaveBeenCalled()
    })
  })
})
