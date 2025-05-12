import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Progress } from '../Progress'

describe('Progress', () => {
  it('renders with default props', () => {
    render(<Progress value={50} />)
    const progressbars = screen.getAllByRole('progressbar')
    expect(progressbars.length).toBe(1)
  })

  it('applies custom className and progressTrackClassName', () => {
    render(
      <Progress
        data-testid='progressbar'
        value={30}
        className='custom-wrapper'
        progressTrackClassName='custom-track'
      />
    )
    const wrapper = screen.getByTestId('progressbar')
    expect(wrapper.className.includes('custom-wrapper')).toBeTruthy()

    const track = wrapper.querySelector('div')
    expect(track?.className.includes('custom-track')).toBeTruthy()
  })

  it('applies fullWidth data attribute', () => {
    render(<Progress data-testid='progressbar' value={10} fullWidth />)
    const wrapper = screen.getByTestId('progressbar')
    expect(wrapper.getAttribute('data-fullwidth')).toBe('true')
  })

  it('applies size and variant as data attributes', () => {
    render(<Progress data-testid='progressbar' value={25} size='lg' variant='secondary' />)
    const wrapper = screen.getByTestId('progressbar')
    expect(wrapper.getAttribute('data-size')).toBe('lg')
    expect(wrapper.getAttribute('data-variant')).toBe('secondary')
  })

  it('sets correct width based on value and max', () => {
    render(<Progress data-testid='progressbar' value={25} max={200} />)
    const wrapper = screen.getByTestId('progressbar')
    const track = wrapper.querySelector('div')
    expect(track?.getAttribute('style')).toContain('width: 12.5%')
  })

  it('renders visually hidden native progress element', () => {
    render(<Progress value={40} max={100} min={0} valueText='40% complete' />)
    const native = screen.getByRole('progressbar')
    expect(native.tagName.toLowerCase()).toBe('progress')
    expect(native.getAttribute('value')).toBe('40')
    expect(native.getAttribute('max')).toBe('100')
    expect(native.getAttribute('aria-valuetext')).toBe('40% complete')
    expect(native.getAttribute('aria-valuemin')).toBe('0')
  })

  it('uses provided progressId as outer div id', () => {
    render(<Progress data-testid='progressbar' value={90} progressId='my-progress-id' />)
    const wrapper = screen.getByTestId('progressbar')
    expect(wrapper.getAttribute('id')).toBe('my-progress-id')
  })
})
