import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Label } from '../Label.tsx';

describe('Label', () => {
  it('render', () => {
    render(<Label htmlFor=''>Hello</Label>)
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('font-weight', () => {
    render(<Label htmlFor='' fontWeight={500}>Hello</Label>)
    expect(screen.getByText('Hello').dataset.fontweight).toBe('500')
  })
})