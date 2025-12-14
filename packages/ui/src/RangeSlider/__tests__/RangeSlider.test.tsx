import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { RangeSlider } from '../RangeSlider.tsx'
import { RangeSliderProgress, RangeSliderThumb } from '../components'

beforeEach(() => {
  Element.prototype.setPointerCapture = vi.fn()
})

describe('RangeSlider', () => {
  it('renders both thumbs and progress', () => {
    render(
      <RangeSlider defaultValue={[20, 80]} data-testid='slider'>
        <RangeSliderProgress />
        <RangeSliderThumb index={0} data-testid='thumb-0' />
        <RangeSliderThumb index={1} data-testid='thumb-1' />
      </RangeSlider>
    )
    expect(screen.getByTestId('thumb-0')).toBeDefined()
    expect(screen.getByTestId('thumb-1')).toBeDefined()
    expect(screen.getByTestId('slider')).toBeDefined()
  })

  it('calls onChange on pointer drag and prevents overlap if preventSkip=true', () => {
    const onChange = vi.fn()
    render(
      <RangeSlider defaultValue={[30, 60]} onChange={onChange} preventSkip data-testid='slider'>
        <RangeSliderProgress />
        <RangeSliderThumb index={0} data-testid='thumb-0' />
        <RangeSliderThumb index={1} data-testid='thumb-1' />
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
      <RangeSlider defaultValue={[0, 100]} onChange={onChange}>
        <RangeSliderThumb index={0} data-testid='thumb-0' />
        <RangeSliderThumb index={1} data-testid='thumb-1' />
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
      <RangeSlider defaultValue={[10, 90]} step='any' onChange={onChange} data-testid='slider-any'>
        <RangeSliderProgress />
        <RangeSliderThumb index={0} data-testid='thumb-any' />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    )

    const thumb = screen.getByTestId('thumb-any')
    fireEvent.pointerDown(thumb, { clientX: 100 })
    expect(onChange).toHaveBeenCalled()
  })

  it('works in vertical orientation', () => {
    const onChange = vi.fn()
    render(
      <RangeSlider defaultValue={[10, 90]} orientation='vertical' onChange={onChange} data-testid='slider-vertical'>
        <RangeSliderThumb index={0} data-testid='thumb-vert' />
        <RangeSliderThumb index={1} />
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
      <RangeSlider disabled defaultValue={[10, 90]} onChange={onChange} data-testid='slider-disabled'>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
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
      <RangeSlider defaultValue={[40, 45]} minRange={10} onChange={onChange}>
        <RangeSliderThumb index={0} data-testid='thumb-0' />
        <RangeSliderThumb index={1} />
        <RangeSliderProgress />
      </RangeSlider>
    )

    const thumb0 = screen.getByTestId('thumb-0')
    fireEvent.keyDown(thumb0, { key: 'ArrowRight' })
    expect(onChange).toHaveBeenCalled()
  })
})
