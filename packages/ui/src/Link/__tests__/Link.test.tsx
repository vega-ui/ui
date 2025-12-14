import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Link } from '../Link.tsx';

describe('Text', () => {
  it('render default link element', () => {
    render(<Link href='#'>Hello</Link>)
    expect(screen.getByRole('link')).toBeDefined()
  })

  it('has href', () => {
    render(<Link href='#'>Hello</Link>)
    expect(screen.getByRole('link').getAttribute('href')).toBe('#')
  })
})