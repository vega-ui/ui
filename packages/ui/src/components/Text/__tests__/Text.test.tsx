import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Text } from '../Text.tsx';

describe('Text', () => {
  it('render default text element', () => {
    render(<Text>Hello</Text>)
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('render as p', () => {
    render(<Text as='p'>Hello</Text>)
    expect(screen.getByText('Hello').tagName).toBe('P')
  })

  it('font-weight', () => {
    render(<Text fontWeight={500} as='p'>Hello</Text>)
    expect(screen.getByText('Hello').dataset.fontweight).toBe('500')
  })
})