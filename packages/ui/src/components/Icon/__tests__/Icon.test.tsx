import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Icon } from '../Icon.tsx';
import { SupportIcon } from '@vega-ui/icons';

describe('Icon', () => {
  it('default size', () => {
    render(<Icon data-testid='icon'><SupportIcon /></Icon>)
    expect(screen.getByTestId('icon').hasAttribute('data-size')).toBeTruthy()
    expect(screen.getByTestId('icon').getAttribute('data-size')).toBe('sm')
  })

  it('role image', () => {
    render(<Icon data-testid='icon'><SupportIcon /></Icon>)
    expect(screen.getByTestId('icon').getAttribute('role')).toBe('image')
  })

  it('label', () => {
    render(<Icon data-testid='icon' size='sm' aria-label='Support'><SupportIcon /></Icon>)
    expect(screen.getByTestId('icon').getAttribute('aria-label')).toBe('Support')
  })

  it('custom height', () => {
    render(<Icon data-testid='icon' height={64} aria-label='Support'><SupportIcon /></Icon>)
    expect(screen.getByTestId('icon').getAttribute('height')).toBe('64')
  })

  it('custom width', () => {
    render(<Icon data-testid='icon' width={64}><SupportIcon /></Icon>)
    expect(screen.getByTestId('icon').getAttribute('width')).toBe('64')
  })

  it('custom width with size', () => {
    render(<Icon data-testid='icon' width={64} size='sm'><SupportIcon /></Icon>)
    expect(screen.getByTestId('icon').getAttribute('width')).toBe('64')
    expect(screen.getByTestId('icon').hasAttribute('data-size')).toBeFalsy()
  })

  it('custom height with size', () => {
    render(<Icon data-testid='icon' height={64} size='sm'><SupportIcon /></Icon>)
    expect(screen.getByTestId('icon').getAttribute('height')).toBe('64')
    expect(screen.getByTestId('icon').hasAttribute('data-size')).toBeFalsy()
  })
})