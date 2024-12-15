import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Text } from '../Text.tsx';

describe('Text', () => {
  it('render default text element', () => {
    render(<Text>Hello</Text>)
    expect(screen.getByText('Hello')).toBeTruthy()
  })

  it('render as p', () => {
    render(<Text as='p'>Hello</Text>)
    expect(screen.getByText('Hello').tagName).toBe('P')
  })
})