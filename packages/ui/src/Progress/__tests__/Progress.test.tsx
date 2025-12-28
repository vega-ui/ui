import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Progress } from '../Progress'
import { ProgressTrack } from '../components';

describe('Progress', () => {
  it('renders with default props', () => {
    render(
      <Progress value={50}>
        <ProgressTrack />
      </Progress>
    )
    const progressbar = screen.getAllByRole('progressbar')
    expect(progressbar.length).toBe(1)
  })

  it('applies fullWidth data attribute', () => {
    render(<Progress data-testid='progressbar' value={10} fullWidth><ProgressTrack /></Progress>)
    const wrapper = screen.getByTestId('progressbar')
    expect(wrapper.getAttribute('data-full-width')).toBe('true')
  })

  it('applies size and variant as data attributes', () => {
    render(<Progress data-testid='progressbar' value={25} size='lg' variant='secondary'><ProgressTrack /></Progress>)
    const wrapper = screen.getByTestId('progressbar')
    expect(wrapper.getAttribute('data-size')).toBe('lg')
    expect(wrapper.getAttribute('data-variant')).toBe('secondary')
  })
})
