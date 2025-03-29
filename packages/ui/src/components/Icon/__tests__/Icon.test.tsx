import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Icon } from '../Icon.tsx';

describe('Icon', () => {
  it('default size', () => {
    render(<Icon name='support' />)
    expect(screen.getByTestId('icon').hasAttribute('data-size')).toBeTruthy()
    expect(screen.getByTestId('icon').getAttribute('data-size')).toBe('small')
  })

  it('role image', () => {
    render(<Icon name='support' />)
    expect(screen.getByTestId('icon').getAttribute('role')).toBe('image')
  })

  it('label', () => {
    render(<Icon name='support' size='sm' aria-label='Support' />)
    expect(screen.getByTestId('icon').getAttribute('aria-label')).toBe('Support')
  })

  it('custom height', () => {
    render(<Icon name='support' height={64} />)
    expect(screen.getByTestId('icon').getAttribute('height')).toBe('64')
  })

  it('custom width', () => {
    render(<Icon name='support' width={64} />)
    expect(screen.getByTestId('icon').getAttribute('width')).toBe('64')
  })

  it('custom width with size', () => {
    render(<Icon name='support' width={64} size='sm' />)
    expect(screen.getByTestId('icon').getAttribute('width')).toBe('64')
    expect(screen.getByTestId('icon').hasAttribute('data-size')).toBeFalsy()
  })

  it('custom height with size', () => {
    render(<Icon name='support' height={64} size='sm' />)
    expect(screen.getByTestId('icon').getAttribute('height')).toBe('64')
    expect(screen.getByTestId('icon').hasAttribute('data-size')).toBeFalsy()
  })
})