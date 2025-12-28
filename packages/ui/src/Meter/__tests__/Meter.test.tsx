import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Meter } from '../Meter'
import { MeterTrack } from '../components';

describe('Meter', () => {
  it('renders with default props and calculates state', () => {
    render(<Meter value={0.5} data-testid='meter'><MeterTrack /></Meter>)
    const wrapper = screen.getByTestId('meter')
    expect(wrapper).toBeDefined()
    expect(wrapper.getAttribute('data-size')).toBe('md')
    expect(wrapper.getAttribute('data-variant')).toBe('primary')
  })

  it('respects fullWidth attribute', () => {
    render(<Meter value={0.8} fullWidth data-testid='meter'><MeterTrack /></Meter>)
    const wrapper = screen.getByTestId('meter')
    expect(wrapper.getAttribute('data-full-width')).toBe('true')
  })

  it('applies correct state based on value and thresholds', () => {
    const { rerender } = render(
      <Meter value={20} min={0} max={100} low={30} high={70} optimum={100} data-testid='meter'>
        <MeterTrack />
      </Meter>
    )
    expect(screen.getByTestId('meter').getAttribute('data-state')).toBe('bad')

    rerender(
      <Meter value={50} min={0} max={100} low={30} high={70} optimum={100} data-testid='meter' />
    )
    expect(screen.getByTestId('meter').getAttribute('data-state')).toBe('warn')

    rerender(
      <Meter value={85} min={0} max={100} low={30} high={70} optimum={100} data-testid='meter' />
    )
    expect(screen.getByTestId('meter').getAttribute('data-state')).toBe('good')
  })

  it('passes style variables for --meter-value and --meter-max', () => {
    render(<Meter value={42} max={150} data-testid='meter'><MeterTrack /></Meter>)
    const wrapper = screen.getByTestId('meter') as HTMLElement
    const computed = wrapper.getAttribute('style')
    expect(computed?.includes('--meter-value: 42')).toBe(true)
    expect(computed?.includes('--meter-max: 150')).toBe(true)
  })

  it('aria attributes', () => {
    render(
      <Meter
        value={72}
        min={0}
        max={100}
        low={40}
        high={80}
        optimum={90}
        valueText='72% full'
        id='meter-id'
      ><MeterTrack /></Meter>
    )
    const native = screen.getByRole('meter')
    expect(native).toBeDefined()
    expect(native?.getAttribute('aria-valuemin')).toBe('0')
    expect(native?.getAttribute('aria-valuemax')).toBe('100')
    expect(native?.getAttribute('aria-valuetext')).toBe('72% full')
    expect(native?.id).toBe('meter-id')
  })
})
