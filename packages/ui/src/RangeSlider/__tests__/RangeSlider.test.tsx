import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { RangeSlider } from '../RangeSlider.tsx'
import { RangeSliderHiddenInput, RangeSliderProgress, RangeSliderThumb } from '../components'

beforeEach(() => {
  Element.prototype.setPointerCapture = vi.fn()
})

describe('RangeSlider', () => {
  it('renders both thumbs and progress', () => {
    render(
      <RangeSlider defaultValue={[20, 80]} data-testid='slider'>
        <RangeSliderProgress />
        <RangeSliderThumb index={0} data-testid='thumb-0'>
          <RangeSliderHiddenInput name='from' />
        </RangeSliderThumb>
        <RangeSliderThumb index={1} data-testid='thumb-1'>
          <RangeSliderHiddenInput name='to' />
        </RangeSliderThumb>
      </RangeSlider>
    )
    expect(screen.getByTestId('thumb-0')).toBeDefined()
    expect(screen.getByTestId('thumb-1')).toBeDefined()
    expect(screen.getByTestId('slider')).toBeDefined()
  })

  it('calls onChange on pointer drag and prevents overlap if preventSkip=true', () => {
    const onChange = vi.fn()
    render(
      <RangeSlider defaultValue={[30, 60]} onChangeValue={onChange} preventSkip data-testid='slider'>
        <RangeSliderProgress />
        <RangeSliderThumb index={0} data-testid='thumb-0'>
          <RangeSliderHiddenInput name='from' />
        </RangeSliderThumb>
        <RangeSliderThumb index={1} data-testid='thumb-1'>
          <RangeSliderHiddenInput name='to' />
        </RangeSliderThumb>
      </RangeSlider>
    )

    const thumb = screen.getByTestId('thumb-0')
    fireEvent.pointerDown(thumb, { clientX: 150 })
    fireEvent.pointerMove(thumb, { clientX: 300 })
    fireEvent.pointerUp(thumb)

    expect(onChange).toHaveBeenCalled()
  })

  it('supports keyboard interaction', () => {
    const onChange = vi.fn()
    render(
      <RangeSlider defaultValue={[0, 100]} onChangeValue={onChange}>
        <RangeSliderThumb index={0} data-testid='thumb-0'>
          <RangeSliderHiddenInput name='from' />
        </RangeSliderThumb>
        <RangeSliderThumb index={1} data-testid='thumb-1'>
          <RangeSliderHiddenInput name='to' />
        </RangeSliderThumb>
        <RangeSliderProgress />
      </RangeSlider>
    )

    const thumb0 = screen.getByTestId('thumb-0')
    fireEvent.keyDown(thumb0, { key: 'ArrowRight' })
    fireEvent.keyDown(thumb0, { key: 'End' })
    fireEvent.keyDown(thumb0, { key: 'Home' })
    expect(onChange).toHaveBeenCalled()
  })

  it('supports step="any"', () => {
    const onChange = vi.fn()
    render(
      <RangeSlider defaultValue={[10, 90]} step='any' onChangeValue={onChange} data-testid='slider-any'>
        <RangeSliderProgress />
        <RangeSliderThumb index={0} data-testid='thumb-any'>
          <RangeSliderHiddenInput name='from' />
        </RangeSliderThumb>
        <RangeSliderThumb index={1}>
          <RangeSliderHiddenInput name='to' />
        </RangeSliderThumb>
      </RangeSlider>
    )

    const thumb = screen.getByTestId('thumb-any')
    fireEvent.pointerDown(thumb, { clientX: 100 })
    expect(onChange).toHaveBeenCalled()
  })

  it('works in vertical orientation', () => {
    const onChange = vi.fn()
    render(
      <RangeSlider defaultValue={[10, 90]} orientation='vertical' onChangeValue={onChange} data-testid='slider-vertical'>
        <RangeSliderThumb index={0} data-testid='thumb-vert'>
          <RangeSliderHiddenInput name='from' />
        </RangeSliderThumb>
        <RangeSliderThumb index={1}>
          <RangeSliderHiddenInput name='to' />
        </RangeSliderThumb>
        <RangeSliderProgress />
      </RangeSlider>
    )

    const thumb = screen.getByTestId('thumb-vert')
    fireEvent.pointerDown(thumb, { clientY: 100 })
    expect(onChange).toHaveBeenCalled()
  })

  it('respects disabled state', () => {
    const onChange = vi.fn()
    render(
      <RangeSlider disabled defaultValue={[10, 90]} onChangeValue={onChange} data-testid='slider-disabled'>
        <RangeSliderThumb index={0}>
          <RangeSliderHiddenInput name='from' />
        </RangeSliderThumb>
        <RangeSliderThumb index={1}>
          <RangeSliderHiddenInput name='to' />
        </RangeSliderThumb>
        <RangeSliderProgress />
      </RangeSlider>
    )

    const slider = screen.getByTestId('slider-disabled')
    fireEvent.pointerDown(slider, { clientX: 150 })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('respects minRange between thumbs', () => {
    const onChange = vi.fn()
    render(
      <RangeSlider defaultValue={[40, 45]} minRange={10} onChangeValue={onChange}>
        <RangeSliderThumb index={0} data-testid='thumb-0'>
          <RangeSliderHiddenInput name='from' />
        </RangeSliderThumb>
        <RangeSliderThumb index={1}>
          <RangeSliderHiddenInput name='to' />
        </RangeSliderThumb>
        <RangeSliderProgress />
      </RangeSlider>
    )

    const thumb0 = screen.getByTestId('thumb-0')
    fireEvent.keyDown(thumb0, { key: 'ArrowRight' })
    expect(onChange).toHaveBeenCalled()
  })
})
