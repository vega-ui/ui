import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { VisuallyHidden } from '../VisuallyHidden.tsx';

describe('VisuallyHidden', () => {
  it('render default text element', () => {
    render(<VisuallyHidden>Hello</VisuallyHidden>)
    expect(screen.getByText('Hello')).toBeDefined()
  })
})