import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MeterStack } from '../MeterStack.tsx'

describe('MeterStack', () => {
  it('renders with default props', () => {
    render(<MeterStack value={50} data-testid='partial-meter' />)
    const wrapper = screen.getByTestId('partial-meter')
    expect(wrapper).toBeDefined()
    expect(wrapper.getAttribute('data-size')).toBe('md')
  })

  it('applies custom className and fullWidth attribute', () => {
    render(
      <MeterStack
        value={20}
        className='custom-meter'
        fullWidth
        data-testid='partial-meter'
      />
    )
    const wrapper = screen.getByTestId('partial-meter')
    expect(wrapper.className.includes('custom-meter')).toBe(true)
    expect(wrapper.getAttribute('data-full-width')).toBe('true')
  })

  it('sets CSS variables --meter-value and --meter-max', () => {
    render(<MeterStack value={80} max={150} data-testid='partial-meter' />)
    const wrapper = screen.getByTestId('partial-meter')
    const style = wrapper.getAttribute('style')
    expect(style?.includes('--meter-stack-value: 80')).toBe(true)
    expect(style?.includes('--meter-stack-max: 150')).toBe(true)
  })

  it('renders children inside the meter', () => {
    render(
      <MeterStack value={60} data-testid='partial-meter'>
        <div data-testid='child'>Segment</div>
      </MeterStack>
    )
    expect(screen.getByTestId('child').textContent).toBe('Segment')
  })
})
