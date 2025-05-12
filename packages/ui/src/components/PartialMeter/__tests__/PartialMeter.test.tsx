import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PartialMeter } from '../PartialMeter'

describe('PartialMeter', () => {
  it('renders with default props', () => {
    render(<PartialMeter value={50} data-testid='partial-meter' />)
    const wrapper = screen.getByTestId('partial-meter')
    expect(wrapper).toBeDefined()
    expect(wrapper.getAttribute('data-size')).toBe('md')
  })

  it('applies custom className and fullWidth attribute', () => {
    render(
      <PartialMeter
        value={20}
        className='custom-meter'
        fullWidth
        data-testid='partial-meter'
      />
    )
    const wrapper = screen.getByTestId('partial-meter')
    expect(wrapper.className.includes('custom-meter')).toBe(true)
    expect(wrapper.getAttribute('data-fullwidth')).toBe('true')
  })

  it('sets CSS variables --meter-value and --meter-max', () => {
    render(<PartialMeter value={80} max={150} data-testid='partial-meter' />)
    const wrapper = screen.getByTestId('partial-meter')
    const style = wrapper.getAttribute('style')
    expect(style?.includes('--meter-value: 80')).toBe(true)
    expect(style?.includes('--meter-max: 150')).toBe(true)
  })

  it('renders native meter element with correct ARIA attributes', () => {
    render(
      <PartialMeter
        value={42}
        min={0}
        max={100}
        valueText='42% done'
        id='my-meter'
        data-testid='partial-meter'
      />
    )
    const native = screen.getByRole('meter')
    expect(native).toBeDefined()
    expect(native?.getAttribute('min')).toBe('0')
    expect(native?.getAttribute('max')).toBe('100')
    expect(native?.getAttribute('value')).toBe('42')
    expect(native?.getAttribute('aria-valuetext')).toBe('42% done')
    expect(native?.id).toBe('my-meter')
  })

  it('renders children inside the meter', () => {
    render(
      <PartialMeter value={60} data-testid='partial-meter'>
        <div data-testid='child'>Segment</div>
      </PartialMeter>
    )
    expect(screen.getByTestId('child').textContent).toBe('Segment')
  })
})
